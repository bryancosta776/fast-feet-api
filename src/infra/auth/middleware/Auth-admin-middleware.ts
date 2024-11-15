import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Admin } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { PrismaService } from "../../../application/prisma/prisma.service";

import * as jwt from "jsonwebtoken";

export interface RequestWithAdmin extends Request {
  admin: Admin;
}

@Injectable()
export class AdminIdMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const adminId = req.headers.authorization as string;

      const decoded = jwt.verify(adminId, "JWT_PUBLIC_KEY");

      if (!decoded) {
        throw new UnauthorizedException("Decoded");
      }

      const admin = await this.prisma.admin.findUnique({
        where: { id: adminId },
      });

      if (!admin) throw new UnauthorizedException("Invalid administrator ID.");

      next();
    } catch (error) {
      console.error("Erro no middleware:", error);
      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new UnauthorizedException("Failed to authenticate admin.");
      }
    }
  }
}
