import { Test, TestingModule } from "@nestjs/testing";
import { CreateShipmentUseCases } from "./create-shipment";
import { ShipmentRepository } from "../repositories/shipment-repository";
import { Shipment as Shipments } from "../../../src/infra/auth/core/shipment";
import { shipmentRole } from "@prisma/client";

describe("CreateShipmentUseCases", () => {
  let createShipmentUseCases: CreateShipmentUseCases;
  let shipmentRepository: ShipmentRepository;

  const mockShipmentRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateShipmentUseCases,
        { provide: ShipmentRepository, useValue: mockShipmentRepository },
      ],
    }).compile();

    createShipmentUseCases = module.get<CreateShipmentUseCases>(
      CreateShipmentUseCases,
    );
    shipmentRepository = module.get<ShipmentRepository>(ShipmentRepository);
  });

  it("should create a shipment successfully", async () => {
    const shipmentData = {
      id: "1",
      addresse: "123 Main St",
      recipientId: "recip123",
      status: shipmentRole.IN_TRANSIT,
      mailManId: "mailman123",
      updatedAt: new Date(),
      picturesId: '123456'
    };

    const createdShipment = Shipments.create(shipmentData);

    // Mock the create method to do nothing (or return a value if needed)
    mockShipmentRepository.create.mockResolvedValueOnce(createdShipment);

    const result = await createShipmentUseCases.execute(shipmentData);

    expect(mockShipmentRepository.create).toHaveBeenCalledWith(createdShipment);
    expect(result).toEqual({ shipment: createdShipment });
  });
});
