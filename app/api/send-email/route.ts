import { NextResponse } from 'next/server';
import sendEmail from '@/utils/mailer';
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
      const { to, subject } = fields;
      const pdfFile = files['pdf'];
      const participantData: ParticipantData = JSON.parse(fields.orderData);

      if (!pdfFile) {
        reject(new Error('PDF file not found'));
        return;
      }

      if (!participantData) {
        reject(new Error('Participant data is required'));
        return;
      }

      try {
        const html = generateEmailHtmlContent(participantData);
        await sendEmail(to, subject, html, [
          {
            filename: 'cv.pdf',
            content: pdfFile.buffer,
            contentType: 'application/pdf',
          },
        ]);

        resolve(
          NextResponse.json(
            { message: 'Correo enviado exitosamente' },
            { status: 200 }
          )
        );
      } catch (error) {
        console.error('Mail sent successfully', error);
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
