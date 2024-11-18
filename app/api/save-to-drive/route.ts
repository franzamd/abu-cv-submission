import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { authenticate } from '@/utils/auth';
import busboy from 'busboy';
import { Readable } from 'stream';
import { Buffer } from 'buffer';

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
      const orderNumber = fields.orderNumber;

      if (!pdfFile) {
        reject(new Error('PDF file is required'));
        return;
      }

      if (!orderNumber) {
        reject(new Error('Order number is required'));
        return;
      }

      const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
      const fileName = `n-${orderNumber}-cv-${timestamp}.pdf`;

      const auth = await authenticate();
      const drive = google.drive({ version: 'v3', auth });

      const fileMetadata = {
        name: fileName,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
      };

      const media = {
        mimeType: 'application/pdf',
        body: Readable.from(pdfFile.buffer),
      };

      try {
        const file = await drive.files.create({
          requestBody: fileMetadata,
          media: media,
          fields: 'id',
        });

        resolve(NextResponse.json({ fileId: file.data.id }, { status: 200 }));
      } catch (error) {
        console.error('Error saving file to Google Drive', error);
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
