import { ConflictException, Injectable } from "@nestjs/common";
import { MailMan } from "@prisma/client";
import { MailManRepository } from "../repositories/mailman-repository";
 
import { UniqueEntityID } from "src/infra/auth/entities/unique-entity.-id";
import { Mailman } from "src/infra/auth/core/mailman";

interface CreateMailManUseCaseRequest {
  id: UniqueEntityID
  cpf: string;
  password: string;
  name: string;
  contact: string;
  position: string;
  updatedAt: Date;
}

type CreateMailManUseCaseResponse = {
  mailman: MailMan;
};

@Injectable()
export class CreateMailManUseCases {
  constructor(private createMailManRepository: MailManRepository) {}

  async execute({
    cpf,
    password,
    name,
    contact,
    position,
    id,
    updatedAt,
  }: CreateMailManUseCaseRequest): Promise<CreateMailManUseCaseResponse> {

    const mailman = Mailman.create({
      contact,
      position,
      id: id.toString(),
      updatedAt,
      cpf,
      password,
      name,
    });

    const userCredentials = await this.createMailManRepository.findById(
        cpf,
      );

      if (userCredentials) {
        throw new ConflictException("User same cpf address already exists");
      }
  

    await this.createMailManRepository.create(mailman);

    return { mailman };
  }
}
