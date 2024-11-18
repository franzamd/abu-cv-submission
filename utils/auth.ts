import { google } from 'googleapis';

export const authenticate = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'path/to/your/credentials.json',
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  return auth.getClient();
};
