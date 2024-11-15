import { Shipment } from "src/infra/auth/core/shipment";

export abstract class ShipmentRepository {
  abstract create(shipment: Shipment): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Shipment | null>;
  abstract update(shipment: Shipment): Promise<void>;
}
