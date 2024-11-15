import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Env } from "./env";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<Env, true>>(ConfigService);

  const config = new DocumentBuilder()
  .setTitle('fast-feet-API')
  .setDescription('Api desenvolvida com CRUD de entregadores, remessas e recebedores, utilizando NestJS e TypeScript, juntamente com banco de dados Relacional (PostGreSQL)')
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app, config)
  
  SwaggerModule.setup('/admin', app, document)

  const port = configService.get("PORT", { infer: true });

  await app.listen(port);
}
bootstrap();
