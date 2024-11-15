import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../../application/prisma/prisma.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = this.jwtService.verify(token);

      const admin = this.prisma.admin.findUnique({
        where: {
          id: decoded.sub,
        },
      });
      req.user = admin;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
}
