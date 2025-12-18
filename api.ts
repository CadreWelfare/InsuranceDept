
import { FileRecord } from './types';

// IMPORTANT: Replace this with your actual Google Apps Script Web App URL after deployment
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyevnA66NiJRUvHQAwMjh-Inp8TDDbaQz4WcFaZhUk-u_v2YFT8IWLYS1ha1MlQs3Q_/exec';

export const sheetsApi = {
  async fetchFiles(): Promise<FileRecord[]> {
    if (SCRIPT_URL.includes('YOUR_SCRIPT_ID_HERE')) {
      console.warn("Google Sheets API URL not configured. Using local storage as fallback.");
      const local = localStorage.getItem('intimation_files');
      return local ? JSON.parse(local) : [];
    }

    const response = await fetch(SCRIPT_URL);
    if (!response.ok) throw new Error('Failed to fetch data from Sheets');
    return await response.json();
  },

  async saveFile(file: FileRecord, action: 'CREATE' | 'UPDATE' | 'DELETE'): Promise<void> {
    if (SCRIPT_URL.includes('YOUR_SCRIPT_ID_HERE')) {
      // Fallback to local storage if API not set up
      const local = localStorage.getItem('intimation_files');
      let files: FileRecord[] = local ? JSON.parse(local) : [];
      
      if (action === 'CREATE') files = [file, ...files];
      else if (action === 'UPDATE') files = files.map(f => f.FILE_ID === file.FILE_ID ? file : f);
      else if (action === 'DELETE') files = files.filter(f => f.FILE_ID !== file.FILE_ID);
      
      localStorage.setItem('intimation_files', JSON.stringify(files));
      return;
    }

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action, data: file }),
    });
    
    if (!response.ok) throw new Error(`Failed to ${action} record in Sheets`);
  }
};
