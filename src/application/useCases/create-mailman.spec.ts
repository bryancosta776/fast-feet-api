import { Mailman } from "src/infra/auth/core/mailman";
import { CreateMailManUseCases } from "./create-mailMan";
import { MailManRepository } from "../repositories/mailman-repository";
import { UniqueEntityID } from "src/infra/auth/entities/unique-entity.-id";

describe("CreateMailManUseCases", () => {
  it("deve criar um novo carteiro", async () => {
    const mailmanRepository = new (class extends MailManRepository {
      upload(id: string): Promise<void> {
        throw new Error("Method not implemented.");
      }
      async create(mailman: Mailman) {
        return Promise.resolve();
      }

      async delete(id: string): Promise<void> {
        return Promise.resolve();
      }

      async save(mailman: Mailman): Promise<void> {
        return Promise.resolve();
      }

      async findById(id: string): Promise<Mailman | null> {
        return Promise.resolve(null);
      }

      async update(mailman: Mailman): Promise<Mailman | null> {
        return Promise.resolve(null);
      }
    })();

    const createMailManUseCase = new CreateMailManUseCases(mailmanRepository);

    const input = {
      id: new UniqueEntityID(),
      cpf: "any_cpf",
      password: "any_password",
      name: "any_name",
      contact: "any_contact",
      position: "any_position",
      updatedAt: new Date(),
    };

    const output = await createMailManUseCase.execute(input);

    expect(output.mailman.contact).toEqual(input.contact);
    expect(output.mailman.cpf).toEqual(input.cpf);
    expect(output.mailman.name).toEqual(input.name);
    expect(output.mailman.password).toEqual(input.password);
    expect(output.mailman.position).toEqual(input.position);
  });
});
