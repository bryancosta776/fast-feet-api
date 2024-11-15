import {
    ConflictException,
    Body,
    Controller,
    HttpCode,
    Post,
    UsePipes,
  } from "@nestjs/common";
  import { PrismaService } from "../prisma/prisma.service";
 
  import { z } from "zod";
  import { ZodValidationPipe } from "../pipes/zod-pipes";
import { ApiTags } from "@nestjs/swagger";
import { CreateRecipientUseCases } from "../useCases/create-recipient";
import { UniqueEntityID } from "src/infra/auth/entities/unique-entity.-id";
  
  const createRecipientSchema = z.object({
    name: z.string(),
    email: z.string(),
    cpf: z.string(),
    password: z.string()
  });
  
  type CreateRecipientBodySchema = z.infer<typeof createRecipientSchema>;
  
  @ApiTags("createrecipient")
  @Controller("/createrecipient")
  export class CreateRecipientController {
    constructor(private createRecipient: CreateRecipientUseCases) {}
  
    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createRecipientSchema ))
    async handle(@Body() body: CreateRecipientBodySchema) {
      const { name, cpf, password, email } = body;
  
      await this.createRecipient.execute({
        name,
        email,
        password,
        cpf,
        updatedAt: new Date(),
        id: new UniqueEntityID().toString()
      })
  
      
    }
  }
  