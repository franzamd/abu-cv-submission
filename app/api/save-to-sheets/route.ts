import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { authenticate } from '@/utils/auth';
import { ParticipantData } from '@/types/types';

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.json();
  const { fileId, participantData } = body;

  if (!fileId || !participantData) {
    return NextResponse.json(
      { message: 'File ID and participant data are required' },
      { status: 400 }
    );
  }

  const auth = await authenticate();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:A',
    });

    const lastRow = response.data.values ? response.data.values.length : 0;
    const startRow = lastRow + 1;

    const timestamp = new Date().toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const values = [
      [
        timestamp,
        participantData.name,
        participantData.lastName,
        participantData.email,
        participantData.phone,
        participantData.areasOfInterest.join(', '),
        participantData.consent ? 'Sí' : 'No',
        fileId ? `https://drive.google.com/file/d/${fileId}/view` : '',
      ],
    ];

    const request = {
      spreadsheetId,
      range: `Sheet1!A${startRow}:H${startRow + values.length - 1}`,
      valueInputOption: 'RAW',
      resource: {
        values,
      },
    };

    await sheets.spreadsheets.values.append(request);
    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data to Google Sheets', error);
    return NextResponse.json(
      { message: 'Error saving data to Google Sheets', error },
      { status: 500 }
    );
  }
}
