import { ConflictException, Injectable } from "@nestjs/common";
 
import { hash } from "bcryptjs";
 
import { RecipientRepository } from "../repositories/recipient-repository";
import { Recipient } from "src/infra/auth/core/recipient";

interface CreateRecipientUseCaseRequest {
  id: string;
  cpf: string;
  password: string;
  name: string;
 
  updatedAt: Date;
  email: string;
}

type CreateRecipientUseCaseResponse = {
  recipient: Recipient;
};

@Injectable()
export class CreateRecipientUseCases {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    cpf,
    password,
    name,
    id,
    updatedAt,
 
    email,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const recipient = Recipient.create({
      cpf,
      id,
      name,
      password,
      updatedAt,
      email,
    });

    if(recipient.cpf){
      throw new ConflictException("User same cpf address already exists");
    }

 

    await this.recipientRepository.create(recipient);

    return { recipient };
  }
}
