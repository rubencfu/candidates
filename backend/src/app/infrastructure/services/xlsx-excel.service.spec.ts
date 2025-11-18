import { XLSXExcelService } from './xlsx-excel.service';
import { HttpException } from '@nestjs/common';
import * as XLSX from 'xlsx';

describe('XLSXExcelService', () => {
  let service: XLSXExcelService;

  beforeEach(() => {
    service = new XLSXExcelService();
  });

  function createExcelBuffer(data: any[][]): Buffer {
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  }

  test('Parse a valid excel', () => {
    const buffer = createExcelBuffer([['junior', 3, true]]);

    const result = service.parseExcelBuffer(buffer);

    expect(result).toEqual({
      seniority: 'junior',
      years: 3,
      availability: true,
    });
  });

  test('Error if empty excel', () => {
    const buffer = createExcelBuffer([]);

    expect(() => service.parseExcelBuffer(buffer)).toThrow(HttpException);
  });

  test('Throw error if Col1 is not junior/senior', () => {
    const buffer = createExcelBuffer([['wrong', 3, true]]);

    expect(() => service.parseExcelBuffer(buffer)).toThrow(HttpException);
  });

  test('if something else fails, throw HttpException 500', () => {
    expect(() => service.parseExcelBuffer(Buffer.from('not-excel'))).toThrow(
      HttpException
    );
  });
});
