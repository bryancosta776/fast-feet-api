 import { Mailman } from "src/infra/auth/core/mailman";

export abstract class MailManRepository {
  abstract create(mailman: Mailman): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Mailman | null>;
  abstract update(mailman: Mailman): Promise<void>;
  abstract upload(id: string): Promise<void>;
}
