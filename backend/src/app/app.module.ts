import { Module } from '@nestjs/common';

import { HttpExceptionFilter } from './infrastructure/exception-filters';
import { CandidatesModule } from './infrastructure/modules';

@Module({
  imports: [CandidatesModule],
  controllers: [],
  providers: [HttpExceptionFilter],
})
export class AppModule {}
