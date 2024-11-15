import { RecipientRepository } from "src/application/repositories/recipient-repository";
import { Recipient } from "../auth/core/recipient";
import { PrismaService } from "src/application/prisma/prisma.service";
import { PrismaRecipientMapper } from "./mappers/prisma-recipient-repository-mapper";


export class PrismaRecipientRepository implements RecipientRepository{
    constructor(private prisma: PrismaService){}
    async create(recipient: Recipient): Promise<void> {
        const recipientData = PrismaRecipientMapper.toPrisma(recipient)

         await this.prisma.recipient.create({data: recipientData})

        
    }
    async delete(id: string): Promise<void> {
         await this.prisma.recipient.delete({where: {id}})
    }
     
    async findById(id: string): Promise<Recipient | null> {
        const recipientData = await this.prisma.recipient.findUnique({
            where: { id },
        });
    
        if (!recipientData) {
            return null;
        }
    
        return PrismaRecipientMapper.toDomain(recipientData)
          
    }
    async update(recipient: Recipient): Promise<void> {
         const recipientData = PrismaRecipientMapper.toPrisma(recipient)

         const updateRecipient = await this.prisma.recipient.update({where: {id: recipient.id.toString() }, data: recipientData, })
         
    }
}
    

     