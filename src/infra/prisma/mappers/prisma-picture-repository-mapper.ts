import { Picture as PrismaPicture, Prisma, Picture } from "@prisma/client";
import { Pictures } from "src/infra/auth/core/pictures";

export class PrismaPictureMapper {
    static toDomain(raw: PrismaPicture): Pictures {
         
        return Pictures.create({
             shipmentId: raw.shipmentId ?? '',
             id: raw.id.toString(),
             body: raw.body.toString(),
             fileName: raw.fileName,
             fileType: raw.fileType,
             url: raw.url
        }, 
         
    )
    
    }


    static toPrisma(picture: Pictures): Prisma.PictureUncheckedCreateInput{
        return {
             fileName: picture.fileName,
             shipmentId: picture.shipmentId,
             body: Buffer.toString(),
             fileType: picture.fileType,
             url: picture.url
            
        }
    }
}