import * as fs from 'fs';
import csvParser from 'csv-parser';

export function parseCSV(filePath: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const results: string[] = [];

    fs.createReadStream(filePath, {
      encoding: 'cp1252'
    })
      .pipe(csvParser({
        separator: '\t'
      }))
      .on('data', (data: string) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error: Error) => reject(error));
  });
}
