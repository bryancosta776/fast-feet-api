import { Test, TestingModule } from "@nestjs/testing";
import { UpdatedMailManUseCase } from "./update-mailman";
import { MailManRepository } from "../repositories/mailman-repository";
import { UniqueEntityID } from "src/infra/auth/entities/unique-entity.-id";

describe("UpdatedMailManUseCase", () => {
  let updatedMailManUseCase: UpdatedMailManUseCase;
  let mailManRepository: MailManRepository;

  const mockMailManRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatedMailManUseCase,
        { provide: MailManRepository, useValue: mockMailManRepository },
      ],
    }).compile();

    updatedMailManUseCase = module.get<UpdatedMailManUseCase>(
      UpdatedMailManUseCase,
    );
    mailManRepository = module.get<MailManRepository>(MailManRepository);
  });

  it("should update a mailman successfully", async () => {
    const mailmanId = new UniqueEntityID();
    const updateData = {
      id: mailmanId,
      cpf: "12345678900",
      password: "new-password",
      name: "Updated Name",
      contact: "123456789",
      position: "New Position",
      updatedAt: new Date(),
    };

    mockMailManRepository.findById.mockResolvedValueOnce(updateData);
    mockMailManRepository.update.mockResolvedValueOnce(undefined);

    await updatedMailManUseCase.execute(
      { id: mailmanId.toString() },
      {
         
        cpf: "12345678900",
        password: "new-password",
        name: "Updated Name",
        contact: "123456789",
        position: "New Position",
        updatedAt: new Date(),
      },
    );

    expect(mockMailManRepository.findById).toHaveBeenCalledWith(mailmanId);
    expect(mockMailManRepository.update).toHaveBeenCalledWith({
      id: mailmanId,
      cpf: "12345678900",
      password: "new-password",
      name: "Updated Name",
      contact: "123456789",
      position: "New Position",
    });
  });

  it("should throw an error if mailman does not exist", async () => {
    const mailmanId = "1";

    mockMailManRepository.findById.mockResolvedValueOnce(null);

    await expect(
      updatedMailManUseCase.execute(
        { id: mailmanId },
        {
         
          cpf: "12345678900",
          password: "new-password",
          name: "Updated Name",
          contact: "123456789",
          position: "New Position",
          updatedAt: new Date(),
        },
      ),
    ).rejects.toThrow("MailMan is not exists");
  });
});
