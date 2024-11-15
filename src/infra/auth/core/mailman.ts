import { v4 as uuidv4 } from "uuid";
import { Delivery } from "./delivery";
import { UniqueEntityID } from "../entities/unique-entity.-id";
import { Entity } from "../entities/entity";
import { Optional } from "src/types/optional";

export interface MailmanProps {
  updatedAt: Date;
  id: string
  name: string;
  cpf: string;
  password: string;
  contact: string | null ;
  position: string;
}

export class Mailman extends Entity<MailmanProps> {

  get name() {
    return this.props.name;
  }

  get password() {
    return this.props.password;
  }

  get cpf() {
    return this.props.cpf;
  }

  get contact() {
    return this.props.contact;
  }

  get position() {
    return this.props.position;
  }


  get id(){
    return this.props.id.toString()
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  set contact(contact: string | null) {
    this.props.contact = contact;
    this.touch()
  }

  set position(position: string) {
    this.props.position = position;
    this.touch()
  }

  set password(password: string){
    this.props.password = password
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<MailmanProps, 'updatedAt'>, id?: UniqueEntityID) {
    const mailman = new Mailman({
      ...props,
      id: id?.toString() ?? '',
      updatedAt: props.updatedAt ?? new Date()
    });

    return mailman;
  }

}
