import { Uploader, UploadParams } from "src/application/storage/uploader";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";

dotenv.config();

@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      endpoint: `https://${process.env.AWS_BUCKET_NAME}.r2.cloudflarestorage.com`,
      region: "auto",
      credentials: {
        accessKeyId: process.env.AWS_ACESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACESS_KEY || "",
      },
    });
  }

  async upload({
    body,
    fileName,
    fileType,
  }: UploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID();

    const uniqueFileName = `${uploadId}-${fileName}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME || "",
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    );

    return { url: uniqueFileName };
  }
}
