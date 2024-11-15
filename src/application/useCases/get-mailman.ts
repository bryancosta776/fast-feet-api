import { Injectable } from "@nestjs/common";
import { MailMan } from "@prisma/client";
import { Either, right } from "../../infra/either";
import { MailManRepository } from "../repositories/mailman-repository";
import { Mailman } from "../../../src/infra/auth/core/mailman";

interface CreateMailManUseCaseRequest {
  id: string;
}

type CreateMailManUseCaseResponse = {
  mailman: MailMan;
};

@Injectable()
export class GetMailManUseCases {
  constructor(private createMailManRepository: MailManRepository) {}

  async execute({
    id,
  }: CreateMailManUseCaseRequest): Promise<CreateMailManUseCaseResponse> {
    const mailman = await this.createMailManRepository.findById(id);

    if (!mailman) {
      throw new Error(`Mailman não encontrado com id ${id}`);
    }

    return { mailman };
  }
}
