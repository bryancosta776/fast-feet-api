import { Controller, HttpCode, Get, Param } from "@nestjs/common";
import { GetShipmentUseCases } from "../useCases/get-shipment";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("getshipment/:id")
@Controller("/getshipment/:id")
export class GetShipmentController {
  constructor(private getShipment: GetShipmentUseCases) {}

  @Get()
  @HttpCode(201)
  async handle(@Param("id") id: string) {
    const shipment = await this.getShipment.execute({id});

    return shipment;
  }
}
