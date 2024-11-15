import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
} from "@nestjs/common";
import { z } from "zod";
import { UpdatedMailManUseCase } from "../useCases/update-mailman";
import { ApiTags } from "@nestjs/swagger";

const updateBodySchema = z.object({
  name: z.string(),
  password: z.string(),
  cpf: z.string(),
  contact: z.string(),
  position: z.string()
});

type UpdateBodySchema = z.infer<typeof updateBodySchema>;


@ApiTags("updatemailman/:id")
@Controller()
export class UpdateMailmanController {
  constructor( private updateMailMan: UpdatedMailManUseCase) {}

  @Patch("/updatemailman/:id")
  @HttpCode(200)
  async handle(@Body() body: UpdateBodySchema, @Param("id") id: string) {
    const { name, password, cpf, contact, position } = body;

    if (!id) {
      throw new BadRequestException("id is required");
    }

    await this.updateMailMan.execute({id}, {
        name,
        password,
        cpf,
        contact,
        position,
        updatedAt: new Date()
        
       
    });

    return { message: "Carteiro atualizado com sucesso!" };
  }
}
