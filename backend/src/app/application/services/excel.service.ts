export abstract class ExcelService {
  abstract parseExcelBuffer(excel: Buffer): {
    seniority: 'junior' | 'senior';
    years: number;
    availability: boolean;
  };
}
