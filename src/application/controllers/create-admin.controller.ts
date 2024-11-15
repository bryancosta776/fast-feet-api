import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ZodValidationPipe } from "../pipes/zod-pipes";
import { hash } from "bcryptjs";
import { z } from "zod";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";

const createAdminSchema = z.object({
  name: z.string(),
  password: z.string(),
});

type CreateMailManBodySchema = z.infer<typeof createAdminSchema>;

@ApiTags("/admin")

@Controller("/admin")
export class CreateAdminController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAdminSchema))
  async handle(@Body() body: CreateMailManBodySchema) {
    const { name, password } = body;

    const admin = await this.prisma.admin.findFirst({
      where: {
        name,
      },
    });

    if (admin) {
      throw new BadRequestException("administrator already exists ");
    }

    const hashedPassword = await hash(password, 8);

    const createdAdmin = await this.prisma.admin.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

    const acessToken = this.jwt.sign({
      sub: createdAdmin.id,
    });

    return {
      createdAdmin,
      acess_token: acessToken,
    };
  }
}
