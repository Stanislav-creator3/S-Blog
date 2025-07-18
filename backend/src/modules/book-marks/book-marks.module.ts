import { Module } from '@nestjs/common';
import { BookMarksService } from './book-marks.service';
import { BookMarksController } from './book-marks.controller';

@Module({
  controllers: [BookMarksController],
  providers: [BookMarksService],
})
export class BookMarksModule {}
