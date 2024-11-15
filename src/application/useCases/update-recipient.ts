import { Injectable } from "@nestjs/common";
import { MailManRepository } from "../repositories/mailman-repository";
import { RecipientRepository } from "../repositories/recipient-repository";

interface UpdateRecipientUseCaseRequest {
 
  cpf: string;
  password: string;
  name: string;
  shipment?: string;
  email: string;
  updatedAt: Date;
}

interface UpdateIdRecipientUseCaseRequest {
  id: string;
}

@Injectable()
export class UpdatedRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute(
    { id }: UpdateIdRecipientUseCaseRequest,
    { cpf, password, name, email }: UpdateRecipientUseCaseRequest,
  ): Promise<void> {
    const recipient = await this.recipientRepository.findById(id);

    if (!recipient) {
      throw new Error("Recipient is not exists");
    }


    recipient.cpf = cpf
    recipient.email = email
    recipient.password = password
    recipient.name = name
    

    await this.recipientRepository.update(recipient)
  }
}
