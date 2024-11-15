import { Controller, HttpCode, Param, Delete } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DeleteMailManUseCase } from "../useCases/delete-mailman";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("deletemailman/:id")
@Controller("/deletemailman/:id")
export class DeleteMailManController {
  constructor(private deleteMailMan: DeleteMailManUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param("id") id: string) {
    if (!id) {
      throw new Error("Invalid id");
    }

    await this.deleteMailMan.execute({id});
  }
}
