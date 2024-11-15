import { ConflictException, Injectable } from "@nestjs/common";
import {  shipmentRole } from "@prisma/client";
import { ShipmentRepository } from "../repositories/shipment-repository";
import { Shipment } from "src/infra/auth/core/shipment";
 
 

interface CreateShipmentUseCaseRequest {
  addresse: string;
  id: string
  recipientId: string;
  status: shipmentRole;
  mailManId: string;
  updatedAt: Date;
  picturesId: string
}

type CreateShipmentUseCaseResponse = {
  shipment: Shipment;
};

@Injectable()
export class CreateShipmentUseCases {
  constructor(private createShipmentRepository: ShipmentRepository) {}

  async execute({
    addresse,
    mailManId,
    recipientId,
    status,
    updatedAt,
    picturesId,
    id
  }: CreateShipmentUseCaseRequest): Promise<CreateShipmentUseCaseResponse> {
    const shipment = Shipment.create({
      addresse,
      mailManId,
      recipientId,
      status,
      updatedAt,
      picturesId,
      id
    });

    const userCredentials = await this.createShipmentRepository.findById(
          mailManId
    );

    if (userCredentials) {
      throw new ConflictException("User same cpf address already exists");
    }

    await this.createShipmentRepository.create(shipment);

    return { shipment };
  }
}
 
