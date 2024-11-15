import { Mailman } from "src/infra/auth/core/mailman";
import { CreateMailManUseCases } from "./create-mailMan";
import { MailManRepository } from "../repositories/mailman-repository";
import { UniqueEntityID } from "src/infra/auth/entities/unique-entity.-id";

describe("CreateMailManUseCases", () => {
  let mailmanRepository: MailManRepository;
  let createMailManUseCase: CreateMailManUseCases;
  beforeEach(() => {
    mailmanRepository = new (class extends MailManRepository {
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

    createMailManUseCase = new CreateMailManUseCases(mailmanRepository);
  });

  it("should return a CreateMailManUseCaseResponse with the found mailman", async () => {
    // Mock the findById method of the createMailManRepository
    const mockMailMan = {
      id: "any_id",
      cpf: "any_cpf",
      password: "any_password",
      name: "any_name",
      contact: "any_contact",
      position: "any_position",
      updatedAt: new Date(),
    };

    // Call the execute method
    const input = {
      id: new UniqueEntityID(),
    };
    const output = await createMailManUseCase.execute({
      ...mockMailMan,
      id: input.id,
    });

    // Assert the result

    expect(output.mailman.id).toEqual(input.id);
  });
});
