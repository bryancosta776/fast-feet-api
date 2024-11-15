import { Controller, HttpCode, Param, Delete } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DeleteShipmentUseCase } from "../useCases/delete-shipment";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("deleteshipment/:id")
@Controller("/deleteshipment/:id")
export class DeleteShipmentController {
  constructor(private deleteShipment: DeleteShipmentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param("id") id: string) {
    if (!id) {
      throw new Error("Invalid id");
    }

    await this.deleteShipment.execute({id});
  }
}
