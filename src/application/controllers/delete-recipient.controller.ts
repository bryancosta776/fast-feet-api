import { Controller, HttpCode, Param, Delete } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DeleteRecipientUseCase } from "../useCases/delete-recipient";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("deleterecipient/:id")
@Controller("/deleterecipient/:id")
export class DeleteRecipientController {
  constructor(private deleteRecipient: DeleteRecipientUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param("id") id: string) {
    if (!id) {
      throw new Error("Invalid id");
    }

    await this.deleteRecipient.execute({
      
        id,
      
    });
  }
}
