import { ShipmentRepository } from "src/application/repositories/shipment-repository";
import { Shipment } from "../auth/core/shipment";
import { PrismaShipmentMapper } from "./mappers/prisma-shipment-repository-mapper";
import { PrismaService } from "src/application/prisma/prisma.service";

export class PrismaShipmentRepository implements ShipmentRepository{
    constructor(private prisma: PrismaService){}
    async create(shipment: Shipment): Promise<void> {
         const shipmentData = PrismaShipmentMapper.toPrisma(shipment)

         await this.prisma.shipment.create({data: shipmentData})
    }
    async delete(id: string): Promise<void> {
        await this.prisma.shipment.delete({where: {id}})
    }
    async findById(id: string): Promise<Shipment | null> {
        const shipmentData = await this.prisma.shipment.findUnique({where: {id}})

        if(!shipmentData){
            return null
        }

        return PrismaShipmentMapper.toDomain(shipmentData)
    }
    async update(shipment: Shipment): Promise<void> {
        const shipmentData = PrismaShipmentMapper.toPrisma(shipment)

        await this.prisma.shipment.update({where: {id: shipment.id.toString()}, data: shipmentData})
    }
    
}