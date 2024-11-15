import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Param,
    Patch,
  } from "@nestjs/common";
   
  import { z } from "zod";
import { UpdatedRecipientUseCase } from "../useCases/update-recipient";
import { ApiTags } from "@nestjs/swagger";
  
  const updateBodySchema = z.object({
    name: z.string(),
    password: z.string(),
    email: z.string(),
    cpf: z.string()
  });
  
  type UpdateBodySchema = z.infer<typeof updateBodySchema>;
  
  @ApiTags("updaterecipient/:id")
  @Controller()
  export class UpdateRecipientController {
    constructor( private updateRecipient: UpdatedRecipientUseCase) {}
  
    @Patch("/updaterecipient/:id")
    @HttpCode(200)
    async handle(@Body() body: UpdateBodySchema, @Param("id") id: string) {
      const { name, password, email, cpf } = body;
  
       
      await this.updateRecipient.execute({id}, {name, password, email, cpf, updatedAt: new Date()})


      return { message: "Updated Recipient" };
    }
  }
  