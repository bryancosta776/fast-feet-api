import { Injectable } from "@nestjs/common";
import { MailManRepository } from "../repositories/mailman-repository";
import { shipmentRole } from "@prisma/client";
import { ShipmentRepository } from "../repositories/shipment-repository";
import { RecipientRepository } from "../repositories/recipient-repository";

interface UpdateRecipientUseCaseRequest {
 
  cpf: string;
  password: string;
  name: string;
  updatedAt: Date;
  addresse: string;
  recipientId: string;
 
}

interface UpdateIdShipmentUseCaseRequest {
  id: string;
}

@Injectable()
export class UpdatedShipmentUseCase {
  constructor(private shipmentRepository: ShipmentRepository) {}

  async execute(
    { id }: UpdateIdShipmentUseCaseRequest,
    { addresse, recipientId,  }: UpdateRecipientUseCaseRequest,
  ): Promise<void> {
    const shipment = await this.shipmentRepository.findById(id);

    if (!shipment) {
      throw new Error("Recipient is not exists");
    }

    shipment.addresse = addresse
    shipment.recipientId = recipientId
   

    await this.shipmentRepository.update(shipment)
  }
}
