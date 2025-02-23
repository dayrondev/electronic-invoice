import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { existsSync, unlinkSync } from 'fs';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Public()
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    return {
      ok: true,
      originalName: file.originalname,
      filename: file.filename,
    };
  }

  @Public()
  @Delete(':filename')
  remove(@Param('filename') filename: string) {
    const filePath = resolve('uploads', filename);

    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    try {
      unlinkSync(filePath);
      return { ok: true };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: 'Error removing file',
      };
    }
  }
}
