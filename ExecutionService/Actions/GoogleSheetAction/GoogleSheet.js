import credentials from '../../Config/serviceAccount.json';
import { google } from 'googleapis';
class GoogleSheet {

    constructor() {
        const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'];

        const auth = new google.auth.JWT(
            credentials.client_email,
            null,
            credentials.private_key,
            SCOPES
        );

        this.sheets = google.sheets({ version: 'v4', auth });
        this.drive = google.drive({ version: 'v3', auth });
    }


    createSpreadsheet = async (title, isPublic = true) => {
        const response = await this.sheets.spreadsheets.create({
            resource: {
                properties: {
                    title
                }
            }
        });
        if (isPublic) {
            await this.makeSheetPublic(response.data.spreadsheetId)
        }
        return {
            url: response.data.spreadsheetUrl,
            id: response.data.spreadsheetId
        };
    }
    makeSheetPublic = async (sheetId) => {
        await this.drive.permissions.create({
            resource: {
                type: "anyone",
                role: "writer"
            },
            fileId: sheetId,
            fields: "id",
        });
    }

    addRowsToSheet = async (spreadsheetId, values) => {
        try {

            // The range of the sheet where you want to append rows (e.g., "Sheet1!A:B")
            const range = 'Sheet1!A:B';


            // Append the rows to the sheet
            const response = await this.sheets.spreadsheets.values.append({
                spreadsheetId,
                range,
                valueInputOption: 'RAW',
                resource: {
                    values: [values]
                },
            });

            console.log('Rows added successfully:', response.data);
        } catch (err) {
            console.error('Error adding rows:', err.message);
        }
    }


}

export default GoogleSheet;