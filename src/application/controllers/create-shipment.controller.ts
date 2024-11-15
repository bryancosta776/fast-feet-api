import {
    ConflictException,
    Body,
    Controller,
    HttpCode,
    Post,
    UsePipes,
  } from "@nestjs/common";
  import { PrismaService } from "../prisma/prisma.service";
  import { hash } from "bcryptjs";
  import { string, z } from "zod";
  import { ZodValidationPipe } from "../pipes/zod-pipes";
import { CreateShipmentUseCases } from "../useCases/create-shipment";
import { UniqueEntityID } from "src/infra/auth/entities/unique-entity.-id";
import { ApiTags } from "@nestjs/swagger";

  
  
  const createShipmentSchema = z.object({
    addresse: z.string(),
    recipientId: z.string(),
    status: z.string(),
    mailManId: z.string(),
    picturesId: z.string()
  });
  
  type CreateShipmentBodySchema = z.infer<typeof createShipmentSchema>;
  
  @ApiTags("createshipment")
  @Controller("/createshipment")
  export class CreateShipmentController {
    constructor(private createShipment: CreateShipmentUseCases) {}
  
    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createShipmentSchema))
    async handle(@Body() body: CreateShipmentBodySchema) {
      const { addresse, recipientId, status, mailManId, picturesId } = body;
      await this.createShipment.execute({
          id: new UniqueEntityID().toString(),
          addresse,
          status: "IN_TRANSIT",
          recipientId,
          picturesId,
          mailManId,
          updatedAt: new Date()
    }
       );
    }
  }
  