import { GetRecipientUseCases } from "./get-recipient";
import { RecipientRepository } from "../repositories/recipient-repository";
import { Recipient } from "@prisma/client";

describe("GetRecipientUseCases", () => {
  let getRecipientUseCases: GetRecipientUseCases;
  let recipientRepository: RecipientRepository;

  beforeEach(() => {
    recipientRepository = {
      findById: jest.fn(),
    } as unknown as RecipientRepository;
    getRecipientUseCases = new GetRecipientUseCases(recipientRepository);
  });

  it("deve retornar um destinatário se encontrado", async () => {
    const recipient: Recipient = {
      id: "1",
      name: "Recipient Name",
      email: "recipient@example.com",
      cpf: "qualquer coisa",
      password: "qualquer coisa",
    } as Recipient;

    (recipientRepository.findById as jest.Mock).mockResolvedValue(recipient);

    const result = await getRecipientUseCases.execute({ id: "1" });

    expect(result).toEqual({ recipient });
    expect(recipientRepository.findById).toHaveBeenCalledWith("1");
  });

  it("deve lançar um erro se o destinatário não for encontrado", async () => {
    (recipientRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(getRecipientUseCases.execute({ id: "1" })).rejects.toThrow(
      "Mailman não encontrado com id 1",
    );
    expect(recipientRepository.findById).toHaveBeenCalledWith("1");
  });
});
