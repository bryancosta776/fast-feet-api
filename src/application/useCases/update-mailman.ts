import { Injectable } from "@nestjs/common";
import { MailManRepository } from "../repositories/mailman-repository";
import { UniqueEntityID } from "src/infra/auth/entities/unique-entity.-id";

interface UpdateMailManUseCaseRequest {
  cpf: string;
  password: string;
  name: string;
  contact: string;
  position: string;
  updatedAt: Date;
}

interface UpdateIdMailManUseCaseRequest {
  id: string;
}

@Injectable()
export class UpdatedMailManUseCase {
  constructor(private mailManRepository: MailManRepository) {}

  async execute(
    { id }: UpdateIdMailManUseCaseRequest,
    { cpf, password, name, contact, position }: UpdateMailManUseCaseRequest,
  ): Promise<void> {
    const mailman = await this.mailManRepository.findById(id);

    if (!mailman) {
      throw new Error("MailMan is not exists");
    }

    mailman.contact = contact
    mailman.cpf = cpf
    mailman.name = name
    mailman.password = password
    mailman.position = position

    await this.mailManRepository.update(mailman)

     
  }
}
