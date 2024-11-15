import {  MailMan as PrismaMailMan, Prisma } from "@prisma/client";
import { Mailman } from "src/infra/auth/core/mailman";
import { UniqueEntityID } from "src/infra/auth/entities/unique-entity.-id";

export class PrismaMailManMapper {
    static toDomain(raw: PrismaMailMan): Mailman {
        const uniqueId = new UniqueEntityID(raw.id)
        return Mailman.create({
            id: new UniqueEntityID(raw.id).toString(),
            contact: raw.contact,
            cpf: raw.cpf,
            name: raw.name,
            password: raw.password,
            position: raw.position,
            updatedAt: new Date()
        }, 
        uniqueId,
    )
    
    }


    static toPrisma(mailman: Mailman): Prisma.MailManUncheckedCreateInput{
        return {
            id: mailman.id.toString(),
            cpf: mailman.cpf,
            name: mailman.name,
            password: mailman.password,
            contact: mailman.contact,
            position: mailman.position,

            
            
        }
    }
}