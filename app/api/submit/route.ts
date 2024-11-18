import { NextResponse } from 'next/server';
import axios from 'axios';
import busboy from 'busboy';
import { Readable } from 'stream';
import { Buffer } from 'buffer';
import { generateEmailHtmlContent } from '@/utils/emailTemplate';
import { ParticipantData } from '@/types/types';

export async function POST(req: Request): Promise<NextResponse> {
  const contentType = req.headers.get('content-type');
  if (!contentType || !contentType.includes('multipart/form-data')) {
    return NextResponse.json(
      { message: 'Content-Type must be multipart/form-data' },
      { status: 400 }
    );
  }

  const bb = busboy({ headers: { 'content-type': contentType } });

  return new Promise((resolve, reject) => {
    const fields: { [key: string]: string } = {};
    const files: {
      [key: string]: {
        filename: string;
        encoding: string;
        mimetype: string;
        buffer: Buffer;
      };
    } = {};

    bb.on('field', (fieldname: string, val: string) => {
      fields[fieldname] = val;
    });

    bb.on(
      'file',
      (
        fieldname: string,
        file: any,
        filename: string,
        encoding: string,
        mimetype: string
      ) => {
        const chunks: any[] = [];
        file.on('data', (data: any) => {
          chunks.push(data);
        });
        file.on('end', () => {
          files[fieldname] = {
            filename,
            encoding,
            mimetype,
            buffer: Buffer.concat(chunks),
          };
        });
      }
    );

    bb.on('finish', async () => {
      const pdfFile = files.pdf;
      const participantData: ParticipantData = JSON.parse(fields.orderData);
      const email = participantData.email;

      if (!pdfFile) {
        reject(new Error('PDF file is required'));
        return;
      }

      if (!participantData) {
        reject(new Error('Participant data is required'));
        return;
      }

      if (!email) {
        reject(new Error('Email participant is required'));
        return;
      }

      try {
        const formDataEmail = new FormData();
        formDataEmail.append('to', email);
        formDataEmail.append('subject', 'CV ABU');
        formDataEmail.append('html', generateEmailHtmlContent());
        const blob = new Blob([pdfFile.buffer], { type: 'application/pdf' });
        formDataEmail.append('pdf', blob, 'cv.pdf');

        await axios.post(
          `${process.env.BASE_URL}/api/send-email`,
          formDataEmail,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const formDataDrive = new FormData();
        formDataDrive.append('pdf', blob);
        formDataDrive.append('orderNumber', participantData.orderNumber);

        const driveResponse = await axios.post(
          `${process.env.BASE_URL}/api/save-to-drive`,
          formDataDrive,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const fileId = driveResponse.data.fileId;

        await axios.post(`${process.env.BASE_URL}/api/save-to-sheets`, {
          fileId,
          participantData,
        });

        resolve(NextResponse.json({ message: 'Success' }, { status: 200 }));
      } catch (error) {
        console.error('Error submitting form', error);
        reject(error);
      }
    });

    bb.on('error', (err: any) => {
      reject(err);
    });

    const readable = Readable.from(req.body as any);
    readable.pipe(bb);
  });
}
