// auth.service.ts
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

interface Admin {
  cpf: string;
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(cpf: string, pass: string): Promise<Admin | null> {
    // Valide o usuário com base na lógica do seu aplicativo
    const admin = { userId: 1, cpf: "test" };
    if (admin && admin.cpf === cpf && pass === "password") {
      return admin;
    }
    return null;
  }

  async login(admin: Admin) {
    const payload = { cpf: admin.cpf, sub: admin.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
