import { UpdatedShipmentUseCase } from "./update-shipment";
import { ShipmentRepository } from "../repositories/shipment-repository";

describe("UpdatedShipmentUseCase", () => {
  let updatedShipmentUseCase: UpdatedShipmentUseCase;
  let shipmentRepository: ShipmentRepository;

  beforeEach(() => {
    shipmentRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as ShipmentRepository; // Mock do ShipmentRepository
    updatedShipmentUseCase = new UpdatedShipmentUseCase(shipmentRepository);
  });

  it("deve atualizar a remessa se encontrada", async () => {
    const shipmentId = "1";
    const shipmentCreated = {
      id: shipmentId,
      cpf: "123456",
      password: "456123",
      name: "bryan",
      updatedAt: new Date(),
      addresse: "123 Main St",
      recipientId: "recipient-id",
      mailManId: "mailman-id",
    };

    const shipment = { id: shipmentId, status: "PENDING" }; // Simulando uma remessa existente

    (shipmentRepository.findById as jest.Mock).mockResolvedValue(shipment);
    await updatedShipmentUseCase.execute({ id: shipmentId }, shipmentCreated);

    expect(shipmentRepository.findById).toHaveBeenCalledWith(shipmentId);
    expect(shipmentRepository.update).toHaveBeenCalledWith({
      id: shipmentId,
      addresse: shipmentCreated.addresse,
      status: "DELIVERED",
      recipientId: shipmentCreated.recipientId,
      mailManId: shipmentCreated.mailManId,
    });
  });

  it("deve lançar um erro se a remessa não for encontrada", async () => {
    const shipmentId = "1";
    const request = {
      id: shipmentId,
      cpf: "123456",
      password: "456123",
      name: "bryan",
      updatedAt: new Date(),
      addresse: "123 Main St",
      recipientId: "recipient-id",
      mailManId: "mailman-id",
    };

    (shipmentRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      updatedShipmentUseCase.execute({ id: shipmentId }, request),
    ).rejects.toThrow("Recipient is not exists");
    expect(shipmentRepository.findById).toHaveBeenCalledWith(shipmentId);
    expect(shipmentRepository.update).not.toHaveBeenCalled(); // Garantindo que o update não foi chamado
  });
});
