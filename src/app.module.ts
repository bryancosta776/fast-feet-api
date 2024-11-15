import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { PrismaService } from "./application/prisma/prisma.service";
 
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
 
import { UploadPictureController } from "./application/controllers/upload-picture.controller";
import { GetMailManUseCases } from "./application/useCases/get-mailman";
import { CreateMailManUseCases } from "./application/useCases/create-mailMan";
import { UpdatedMailManUseCase } from "./application/useCases/update-mailman";
import { DeleteMailManUseCase } from "./application/useCases/delete-mailman";
import { GetShipmentUseCases } from "./application/useCases/get-shipment";
import { CreateShipmentUseCases } from "./application/useCases/create-shipment";
import { DeleteShipmentUseCase } from "./application/useCases/delete-shipment";
import { UpdatedShipmentUseCase } from "./application/useCases/update-shipment";
import { CreateRecipientUseCases } from "./application/useCases/create-recipient";
import { GetRecipientUseCases } from "./application/useCases/get-recipient";
import { DeleteRecipientUseCase } from "./application/useCases/delete-recipient";
import { UpdatedRecipientUseCase } from "./application/useCases/update-recipient";
import { StorageModule } from "./infra/storage/storage-module";
import { UploadPictureUseCases } from "./application/useCases/upload-pictures-mailman";
import { CreateShipmentController } from "./application/controllers/create-shipment.controller";
import { GetShipmentController } from "./application/controllers/get-shipment.controller";
import { CreateRecipientController } from "./application/controllers/create-recipient.controller";
import { UpdateShipmentController } from "./application/controllers/update-shipment.controller";
import { DeleteShipmentController } from "./application/controllers/delete-shipment.controller";
import { GetRecipientController } from "./application/controllers/get-recipient.controller";
import { DeleteRecipientController } from "./application/controllers/delete-recipient.controller";
import { UpdateRecipientController } from "./application/controllers/update-recipient.controller";
import { CreateMailManController } from "./application/controllers/create-mailman.controller";
import { AuthModule } from "./infra/auth/auth.module";
import { CreateAdminController } from "./application/controllers/create-admin.controller";
import { GetMailManController } from "./application/controllers/get-mailman.controller";
import { DeleteMailManController } from "./application/controllers/delete-mailman.controller";
import { UpdateMailmanController } from "./application/controllers/update-mailman.controller";
import { AuthenticateMailManController } from "./application/controllers/authenticate.controller";
import { AdminIdMiddleware } from "./infra/auth/middleware/Auth-admin-middleware";
import { JwtMiddleware } from "./infra/auth/middleware/auth.middleware";
import { MailManRepository } from "./application/repositories/mailman-repository";
import { PrismaMailManRepository } from "./infra/prisma/prismaMailManRepository";
import { ShipmentRepository } from "./application/repositories/shipment-repository";
import { PrismaShipmentRepository } from "./infra/prisma/prismaShipmentRepository";
import { RecipientRepository } from "./application/repositories/recipient-repository";
import { PrismaRecipientRepository } from "./infra/prisma/prismaRecipientRepository";
import { PictureRepository } from "./application/repositories/picture-repository";
import { PrismaPictureRepository } from "./infra/prisma/prismaPictureRepository";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    StorageModule,
  ],
  controllers: [
    CreateAdminController,
    CreateMailManController,
    GetMailManController,
    DeleteMailManController,
    UpdateMailmanController,

    CreateShipmentController,
    GetShipmentController,
    UpdateShipmentController,
    DeleteShipmentController,

    CreateRecipientController,
    GetRecipientController,
    DeleteRecipientController,
    UpdateRecipientController,

    AuthenticateMailManController,
    UploadPictureController,
    
  ],
  providers: [
    CreateMailManUseCases,
    UpdatedMailManUseCase,
    DeleteMailManUseCase,
    GetMailManUseCases,
    CreateShipmentUseCases,
    GetShipmentUseCases,
    DeleteShipmentUseCase,
    UpdatedShipmentUseCase,
    CreateRecipientUseCases,
    GetRecipientUseCases,
    DeleteRecipientUseCase,
    UpdatedRecipientUseCase,
    PrismaService,
    AdminIdMiddleware,
    UploadPictureUseCases,
    PrismaService,
    {
      provide: MailManRepository,
      useClass: PrismaMailManRepository
    },
    {
      provide: ShipmentRepository,
      useClass: PrismaShipmentRepository
    },
    {
      provide: RecipientRepository,
      useClass: PrismaRecipientRepository
    },
    {
      provide: PictureRepository,
      useClass: PrismaPictureRepository
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes("/account", "/createrecipient",  "/createshipment",  "/mailman", "/deletemailman/:id", "/deleterecipient/:id", "/deleteshipment/:id", "/deleteshipment/:id", "/getmailman/:id", "/getrecipient/:id", "/getshipment/:id", "/updatemailman/:id", "/updaterecipient/:id", '/updateshipment/:id/:mailmanId');
  }
}
