import { Injectable } from "@nestjs/common";
import { MailManRepository } from "../repositories/mailman-repository";
import { ShipmentRepository } from "../repositories/shipment-repository";

interface DeleteShipmentUseCaseRequest {
  id: string;
}

@Injectable()
export class DeleteShipmentUseCase {
  constructor(private shipmentRepository: ShipmentRepository) {}

  async execute({ id }: DeleteShipmentUseCaseRequest): Promise<void> {
    const shipment = await this.shipmentRepository.findById(id);
    if (!shipment) {
      throw new Error("Shipment does not exists");
    }
    await this.shipmentRepository.delete(id);
  }
}
