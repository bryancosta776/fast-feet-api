import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/application/prisma/prisma.service';
import { MailManRepository } from '../../application/repositories/mailman-repository';
import { Mailman } from 'src/infra/auth/core/mailman';   
import { PrismaMailManMapper } from './mappers/prisma-mailman-repository-mapper';
 

@Injectable()
export class PrismaMailManRepository implements MailManRepository {
  constructor(private prisma: PrismaService) {}
    
    async upload(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

  async create(mailman: Mailman): Promise<void> {
    const data = PrismaMailManMapper.toPrisma(mailman)

    await this.prisma.mailMan.create({data});
  }

  async update(mailman: Mailman): Promise<void> {

    const mailmanData = PrismaMailManMapper.toPrisma(mailman)

    const updateMailMan = await this.prisma.mailMan.update({
      where: { id: mailman.id.toString() },
      data: mailmanData,
    });


     
 

  }

  async findById(id: string): Promise<Mailman | null> {
    const mailmanData = await this.prisma.mailMan.findUnique({
      where: { id },
    });


    if (!mailmanData){
        return null
    }

      return PrismaMailManMapper.toDomain(mailmanData)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.mailMan.delete({
      where: { id },
    });
  }
}
