import { HttpException, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

import { invariant } from '@building-blocks/invariant';

import { ExcelService } from '../../application/services';

interface RawExcelRow {
  Col1: 'junior' | 'senior';
  Col2: number;
  Col3: boolean;
}

@Injectable()
export class XLSXExcelService implements ExcelService {
  constructor() {}

  parseExcelBuffer(excel: Buffer): {
    seniority: 'junior' | 'senior';
    years: number;
    availability: boolean;
  } {
    try {
      const workbook = XLSX.read(excel, { type: 'buffer' });

      const sheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[sheetName];

      const raw: RawExcelRow[] = XLSX.utils.sheet_to_json<RawExcelRow>(
        workSheet,
        {
          header: ['Col1', 'Col2', 'Col3'],
          range: 0,
          defval: null,
        }
      );

      if (raw.length === 0) {
        throw new HttpException('Excel file is empty', 400);
      }

      const row = raw[0];

      invariant(
        'First column should be junior or senior',
        row.Col1 === 'junior' || row.Col1 === 'senior'
      );

      return {
        seniority: row.Col1,
        years: row.Col2,
        availability: row.Col3,
      };
    } catch (e) {
      throw new HttpException(`Error in XLSX excel service: ${e}`, 500);
    }
  }
}
