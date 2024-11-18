import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { authenticate } from '@/utils/auth';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  const auth = await authenticate();
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!B:B',
    });

    const values = response.data.values;
    let lastOrderNumber = '0';

    if (values && values.length > 0) {
      const numericValues = values.filter(
        (value) => !isNaN(parseInt(value[0]))
      );
      if (numericValues.length > 0) {
        lastOrderNumber = numericValues[numericValues.length - 1][0];
      }
    }

    return NextResponse.json({ lastOrderNumber }, { status: 200 });
  } catch (error) {
    console.error('Error getting last order number from Google Sheets', error);
    return NextResponse.json(
      { message: 'Error getting last order number from Google Sheets', error },
      { status: 500 }
    );
  }
}
