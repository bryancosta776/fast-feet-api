import { Controller, HttpCode, Get, Param } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GetRecipientUseCases } from "../useCases/get-recipient";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("getrecipient/:id")
@Controller("/getrecipient/:id")
export class GetRecipientController {
  constructor(private getRecipient: GetRecipientUseCases) {}

  @Get()
  @HttpCode(201)
  async handle(@Param("id") id: string) {
    const mailman = await this.getRecipient.execute({id});

    return mailman;
  }
}
