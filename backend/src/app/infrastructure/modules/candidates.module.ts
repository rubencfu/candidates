import { Module } from '@nestjs/common';

import { CandidatesController } from '../controllers/candidates.controller';
import { ExcelService } from '../../application/services';

import { XLSXExcelService } from '../services/xlsx-excel.service';

@Module({
  controllers: [CandidatesController],
  providers: [{ provide: ExcelService, useClass: XLSXExcelService }],
})
export class CandidatesModule {}
