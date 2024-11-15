import { Test, TestingModule } from "@nestjs/testing";
import { DeleteShipmentUseCase } from "./delete-shipment";
import { ShipmentRepository } from "../repositories/shipment-repository";

describe("DeleteShipmentUseCase", () => {
  let deleteShipmentUseCase: DeleteShipmentUseCase;
  let shipmentRepository: ShipmentRepository;

  const mockShipmentRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteShipmentUseCase,
        { provide: ShipmentRepository, useValue: mockShipmentRepository },
      ],
    }).compile();

    deleteShipmentUseCase = module.get<DeleteShipmentUseCase>(
      DeleteShipmentUseCase,
    );
    shipmentRepository = module.get<ShipmentRepository>(ShipmentRepository);
  });

  it("should delete a shipment if it exists", async () => {
    const shipmentId = "1";
    const shipmentData = { id: shipmentId, addresse: "123 Main St" }; // Mock data

    mockShipmentRepository.findById.mockResolvedValueOnce(shipmentData);

    await deleteShipmentUseCase.execute({ id: shipmentId });

    expect(mockShipmentRepository.findById).toHaveBeenCalledWith(shipmentId);
    expect(mockShipmentRepository.delete).toHaveBeenCalledWith(shipmentId);
  });

  it("should not delete a shipment if it does not exist", async () => {
    const shipmentId = "1";

    mockShipmentRepository.findById.mockResolvedValueOnce(null);

    await expect(
      deleteShipmentUseCase.execute({ id: shipmentId }),
    ).rejects.toThrow("Shipment does not exists");

    expect(mockShipmentRepository.findById).toHaveBeenCalledWith(shipmentId);
    expect(mockShipmentRepository.delete).toHaveBeenCalledTimes(1);
  });
});
