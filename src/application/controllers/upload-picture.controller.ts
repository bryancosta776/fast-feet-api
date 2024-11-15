import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("/uploads/picture")
export class UploadPictureController {
  constructor() {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async handler(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2, // 2mb
          }),
          new FileTypeValidator({ fileType: ".(png|jpg|jpeg|pdf)" }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }
}
