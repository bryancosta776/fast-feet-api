import { v4 as uuidv4 } from "uuid";
import { Entity } from "../entities/entity";
import { Optional } from "src/types/optional";
import { UniqueEntityID } from "../entities/unique-entity.-id";

export interface RecipientProps {
  id: string;
  cpf: string;
  password: string;
  name: string;
  updatedAt: Date;
  email: string;
}

export class Recipient extends Entity<RecipientProps> {
   

  get id() {
    return this.props.id;
  }

   

  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get password() {
    return this.props.password;
  }

  get email() {
    return this.props.email;
  }

  set cpf(cpf: string){
    this.props.cpf = cpf
  }

  set email(email: string){
    this.props.email = email
  }

  set password(password: string){
    this.props.password = password
    this.touch()
  }

  set name(name: string){
    this.props.name = name
    this.touch()
  }


  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<RecipientProps, 'updatedAt'>, id?: UniqueEntityID) {
    const recipient = new Recipient({
      ...props,
      id: id?.toString() ?? '',
      updatedAt: props.updatedAt || new Date(),
    });

    return recipient;
  }
}
