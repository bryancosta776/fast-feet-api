import { Injectable } from "@nestjs/common";
import { MailMan, Shipment } from "@prisma/client";
import { Either, right } from "../../infra/either";
import { MailManRepository } from "../repositories/mailman-repository";
import { Mailman } from "../../../src/infra/auth/core/mailman";
import { ShipmentRepository } from "../repositories/shipment-repository";

interface CreateMailManUseCaseRequest {
  id: string;
}

type CreateMailManUseCaseResponse = {
  shipment: Shipment;
};

@Injectable()
export class GetShipmentUseCases {
  constructor(private createShipmentRepository: ShipmentRepository) {}

  async execute({
    id,
  }: CreateMailManUseCaseRequest): Promise<CreateMailManUseCaseResponse> {
    const shipment = await this.createShipmentRepository.findById(id);

    if (!shipment) {
      throw new Error(`Mailman não encontrado com id ${id}`);
    }

    return { shipment };
  }
}
