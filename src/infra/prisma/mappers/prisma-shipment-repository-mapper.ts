 
import { Shipment as PrismaShipment, Prisma} from "@prisma/client";
import { Shipment } from "src/infra/auth/core/shipment";
import { UniqueEntityID } from "src/infra/auth/entities/unique-entity.-id";


 
export class PrismaShipmentMapper {

    static toDomain(raw: PrismaShipment): Shipment {
        const uniqueId = new UniqueEntityID(raw.id)
        return Shipment.create({
            addresse: raw.addresse,
            id: new UniqueEntityID(raw.id).toString(),
            mailManId: raw.mailManId ?? '',
            recipientId: raw.recipientId,
            status: raw.status,
            picturesId: raw.pictureId,
            updatedAt: new Date()
            
            
        },
        uniqueId
    );
    }

    static toPrisma(recipient: Shipment): Prisma.ShipmentUncheckedCreateInput {
        return {
            addresse: recipient.addresse,
            pictureId: recipient.pictureId,
            recipientId: recipient.recipientId,
            mailManId: recipient.mailManId,
            status: recipient.status
        };  
    }
}