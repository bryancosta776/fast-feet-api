import { shipmentRole } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { UniqueEntityID } from "../entities/unique-entity.-id";
import { Entity } from "../entities/entity";

export interface ShipmentProps {
  id: string
  addresse: string;
  recipientId: string;
  status: shipmentRole;
  mailManId: string;
  updatedAt: Date;
  picturesId: string
}

export class Shipment extends Entity<ShipmentProps>{


  get addresse() {
    return this.props.addresse;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get status() {
    return this.props.status;
  }

  get mailManId() {
    return this.props.mailManId;
  }

  get pictureId(){
    return this.props.picturesId
  }

  get id(){
    return this.props.id
  }

  set addresse(addresse: string) {
    this.props.addresse = addresse;
    this.touch();
  }

  set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  set mailManId(mailmanId: string) {
    this.props.mailManId = mailmanId;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: ShipmentProps, id?: UniqueEntityID) {
    const shipment = new Shipment({
      ...props,
    
    }, id);

    return shipment;
  }

  static update(props: ShipmentProps, id?: UniqueEntityID) {
    const shipment = new Shipment({
      ...props,
    }, id,);

    return shipment;
  }
}
