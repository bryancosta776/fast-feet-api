import { Recipient } from "src/infra/auth/core/recipient";

 

export abstract class RecipientRepository {
  abstract create(recipient: Recipient): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Recipient | null>;
  abstract update(recipient: Recipient): Promise<void>;
}
