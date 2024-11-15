import { Test, TestingModule } from "@nestjs/testing";
import { GetShipmentUseCases } from "./get-shipment";
import { ShipmentRepository } from "../repositories/shipment-repository";
import { Shipment } from "@prisma/client";

describe("GetShipmentUseCases", () => {
  let getShipmentUseCases: GetShipmentUseCases;
  let shipmentRepository: ShipmentRepository;

  const mockShipmentRepository = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetShipmentUseCases,
        { provide: ShipmentRepository, useValue: mockShipmentRepository },
      ],
    }).compile();

    getShipmentUseCases = module.get<GetShipmentUseCases>(GetShipmentUseCases);
    shipmentRepository = module.get<ShipmentRepository>(ShipmentRepository);
  });

  it("should return a shipment by id", async () => {
    const shipmentData: Shipment = {
      id: "1",
      addresse: "123 Main St",
      recipientId: "recip123",
      pictureId: "1233456",
      status: "PENDING",
      mailManId: "mailman123",
    };

    mockShipmentRepository.findById.mockResolvedValueOnce(shipmentData);

    const result = await getShipmentUseCases.execute({ id: "1" });

    expect(result).toEqual({ shipment: shipmentData });
    expect(mockShipmentRepository.findById).toHaveBeenCalledWith("1");
  });

  it("should throw an error if shipment is not found", async () => {
    mockShipmentRepository.findById.mockResolvedValueOnce(null);

    await expect(getShipmentUseCases.execute({ id: "1" })).rejects.toThrow(
      "Mailman não encontrado com id 1",
    );
  });
});
