import { Controller, HttpCode, Get, Param } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GetMailManUseCases } from "../useCases/get-mailman";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("getmailman/:id")
@Controller("/getmailman/:id")
export class GetMailManController {
  constructor(private getMailMan: GetMailManUseCases) {}

  @Get()
  @HttpCode(201)
  async handle(@Param("id") id: string) {
    const mailman = await this.getMailMan.execute({id});

    return mailman;
  }
}
