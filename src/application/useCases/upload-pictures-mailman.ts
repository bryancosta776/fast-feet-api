import { Injectable } from "@nestjs/common";
import { PictureRepository } from "../repositories/picture-repository";  
import { Uploader } from "../storage/uploader";  
import { Picture } from "@prisma/client";
import { UniqueEntityID } from "src/infra/auth/entities/unique-entity.-id";
import { Pictures } from "src/infra/auth/core/pictures";
 

interface UploadPicturesMailManUseCaseRequest {
  fileName: string;
  fileType: string;
  body: string;
  shipmentId: string;
  url: string;

}

type UploadPicturesMailManUseCaseResponse = {
  picture: Picture;
  
};

@Injectable()
export class UploadPictureUseCases {
  constructor(
    private pictureRepository: PictureRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
    shipmentId
  }: UploadPicturesMailManUseCaseRequest): Promise<UploadPicturesMailManUseCaseResponse> {
    if (
      !/^(image\/jpeg|image\/jpg|image\/png|application\/pdf)$/.test(fileType)
    ) {
      throw new Error(
        "Tipo de arquivo inválido! Apenas JPEG, PNG ou PDF são permitidos.",
      );
    }

    let fileUrl: string;
    try {
      const { url } = await this.uploader.upload({
        fileName,
        fileType,
        body: Buffer.from(body, 'utf-8')
      });
      fileUrl = url;
    } catch (error: any) {
      throw new Error("Erro ao fazer o upload do arquivo: " + error.message);
    }

    

    const pictureCreated = Pictures.create({
      fileName,
      fileType,
      body,
      shipmentId,
      url: fileUrl,
      id: new UniqueEntityID().toString()
    }, new UniqueEntityID());

    const picture = await this.pictureRepository.create(pictureCreated)

    return {picture}
    

    
  }
}
