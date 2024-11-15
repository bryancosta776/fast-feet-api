import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes
} from "@nestjs/common";
import { hash } from "bcryptjs";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-pipes";
import { CreateMailManUseCases } from "../useCases/create-mailMan";
import { UniqueEntityID } from "src/infra/auth/entities/unique-entity.-id";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

const createMailManSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  password: z.string(),
  contact: z.string(),
  position: z.string(),
  updatedAt: z.string(),
   
});

type CreateMailManBodySchema = z.infer<typeof createMailManSchema>;

@ApiTags("account")
@Controller("/account")
export class CreateMailManController {
  constructor(private createMailMan: CreateMailManUseCases) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createMailManSchema))
  async handle(@Body() body: CreateMailManBodySchema) {
    const { name, cpf, password, contact, position } = body;

    const hashedPassword = await hash(password, 8);

    await this.createMailMan.execute({
        contact,
        position,
        id: new UniqueEntityID(),
        updatedAt: new Date(),
        name,
        cpf,
        password: hashedPassword,
      
    })
  }
}
