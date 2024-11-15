import { Injectable } from "@nestjs/common";
import { MailManRepository } from "../repositories/mailman-repository";

interface DeleteMailManUseCaseRequest {
  id: string;
}

@Injectable()
export class DeleteMailManUseCase {
  constructor(private mailManRepository: MailManRepository) {}

  async execute({ id }: DeleteMailManUseCaseRequest): Promise<void> {
    const mailman = await this.mailManRepository.findById(id);

    if (!mailman) {
      throw new Error("Shipment does not exists");
    }
    await this.mailManRepository.delete(id);
  }
}
