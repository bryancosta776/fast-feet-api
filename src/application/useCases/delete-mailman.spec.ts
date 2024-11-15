import { DeleteMailManUseCase } from "./delete-mailman"; // ajuste o caminho conforme necessário
import { MailManRepository } from "../repositories/mailman-repository";

describe("DeleteMailManUseCase", () => {
  let deleteMailManUseCase: DeleteMailManUseCase;
  let mailManRepository: MailManRepository;

  beforeEach(() => {
    mailManRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as unknown as MailManRepository; // Mock do MailManRepository
    deleteMailManUseCase = new DeleteMailManUseCase(mailManRepository);
  });

  it("deve excluir um MailMan se encontrado", async () => {
    const mailmanId = "1";

    (mailManRepository.findById as jest.Mock).mockResolvedValue({
      id: mailmanId,
    });

    await deleteMailManUseCase.execute({ id: mailmanId });

    expect(mailManRepository.findById).toHaveBeenCalledWith(mailmanId);
    expect(mailManRepository.delete).toHaveBeenCalledWith(mailmanId);
  });

  it("deve lançar um erro se o MailMan não for encontrado", async () => {
    const mailmanId = "1";

    (mailManRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      deleteMailManUseCase.execute({ id: mailmanId }),
    ).rejects.toThrow("Shipment does not exists");

    expect(mailManRepository.findById).toHaveBeenCalledWith(mailmanId);
    expect(mailManRepository.delete).not.toHaveBeenCalled(); // Garantindo que delete não foi chamado
  });
});
