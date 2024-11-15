import { Injectable } from "@nestjs/common";
import { Recipient } from "@prisma/client";

import { RecipientRepository } from "../repositories/recipient-repository";

interface GetRecipientUseCaseRequest {
  id: string;
}

type GetRecipientUseCaseResponse = {
  recipient: Recipient;
};

@Injectable()
export class GetRecipientUseCases {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    id,
  }: GetRecipientUseCaseRequest): Promise<GetRecipientUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(id);

    if (!recipient) {
      throw new Error(`Mailman não encontrado com id ${id}`);
    }

    return { recipient };
  }
}
