import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";

import { ZodValidationPipe } from "../pipes/zod-pipes";
import { PrismaService } from "../prisma/prisma.service";
import { z } from "zod";
import { ApiTags } from "@nestjs/swagger";

const authenticateBodyMailManSchema = z.object({
  cpf: z.string(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodyMailManSchema>;

@ApiTags("authenticate")
@Controller("/sessions")
export class AuthenticateMailManController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authenticateBodyMailManSchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { cpf, password } = body;

    const mailMan = await this.prisma.mailMan.findFirst({
      where: {
        cpf,
      },
    });

    if (!mailMan) {
      throw new UnauthorizedException("User credentials does not to match");
    }

    const isPassword = await compare(password, mailMan.password);

    if (!isPassword) {
      throw new UnauthorizedException("User credentials does not to match");
    }

    const acessToken = this.jwt.sign({
      sub: mailMan.id,
    });

    return {
      acess_token: acessToken,
    };
  }
}
