import { Test, TestingModule } from "@nestjs/testing";
import { CreateRecipientUseCases } from "./create-recipient"; // Ajuste o caminho conforme necessário
import { RecipientRepository } from "../repositories/recipient-repository";
import { Recipient } from "../../../src/infra/auth/core/recipient";

describe("CreateRecipientUseCases", () => {
  let createRecipientUseCases: CreateRecipientUseCases;
  let recipientRepository: RecipientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRecipientUseCases,
        {
          provide: RecipientRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createRecipientUseCases = module.get<CreateRecipientUseCases>(
      CreateRecipientUseCases,
    );
    recipientRepository = module.get<RecipientRepository>(RecipientRepository);
  });

  it("should create a recipient successfully", async () => {
    const request = {
      cpf: "123.456.789-00",
      id: "123",
      name: "John Doe",
      password: "password123",
      shipment: "Shipment info",
      updatedAt: expect.any(Date),
      email: "qualquer coisa",
    };

    const recipient = Recipient.create(request);

    await createRecipientUseCases.execute(request);

    expect(recipientRepository.create).toHaveBeenCalledTimes(1);
    expect(recipientRepository.create).toHaveBeenCalledWith(recipient);
  });

  it("should throw an error if the recipient cannot be created", async () => {
    const request = {
      id: "123",
      cpf: "123.456.789-00",
      addresse: "qualquer coisa",
      password: "password123",
      name: "John Doe",
      shipment: "Shipment info",
      email: "qualquer coisa",
      updatedAt: new Date(),
    };

    jest
      .spyOn(recipientRepository, "create")
      .mockRejectedValue(new Error("Error"));

    await expect(createRecipientUseCases.execute(request)).rejects.toThrow(
      "Error",
    );
  });
});
