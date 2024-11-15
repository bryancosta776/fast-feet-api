import { Injectable } from "@nestjs/common";
import { MailManRepository } from "../repositories/mailman-repository";
import { RecipientRepository } from "../repositories/recipient-repository";

interface DeleteMailManUseCaseRequest {
  id: string;
}

@Injectable()
export class DeleteRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({ id }: DeleteMailManUseCaseRequest): Promise<void> {
    const mailman = await this.recipientRepository.findById(id);

    if (!mailman) {
      throw new Error("Recipient does not exists");
    }
    await this.recipientRepository.delete(id);
  }
}
