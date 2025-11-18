import {
  Body,
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

import { ExcelService } from '../../application/services';
import { Candidate } from '../../domain/models/candidate';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly excelService: ExcelService) {}

  @Post()
  @UseInterceptors(FileInterceptor('excel'))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [new MaxFileSizeValidator({ maxSize: 50_000_000 })],
      })
    )
    excel: Express.Multer.File,
    @Body() body: { name: string; surname: string }
  ) {
    const parsed = this.excelService.parseExcelBuffer(excel.buffer);

    const candidate: Candidate = {
      name: body.name,
      surname: body.surname,
      ...parsed,
    };

    return { candidate };
  }
}
