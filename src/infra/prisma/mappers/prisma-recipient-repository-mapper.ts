import { Injectable } from "@nestjs/common";
import { Recipient as PrismaRecipient, Prisma} from "@prisma/client";
import { Recipient } from "src/infra/auth/core/recipient";
 
 
import { UniqueEntityID } from "src/infra/auth/entities/unique-entity.-id";


 
export class PrismaRecipientMapper {

    static toDomain(raw: PrismaRecipient): Recipient {
        const uniqueId = new UniqueEntityID(raw.id)
        return Recipient.create({
            
            id: new UniqueEntityID(raw.id).toString(),
            cpf: raw.cpf,
            email: raw.email,
            password: raw.password,
            name: raw.name,
            updatedAt: new Date(),
        },
        uniqueId
    );
    }

    static toPrisma(recipient: Recipient): Prisma.RecipientUncheckedCreateInput {
        return {
            cpf: recipient.cpf,
            email: recipient.email,
            name: recipient.name,
            password: recipient.password,
            id: recipient.id.toString(),
        };  
    }
}