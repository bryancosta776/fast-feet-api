import { BadRequestException, Body, Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { UpdatedShipmentUseCase } from '../useCases/update-shipment';
import { z } from 'zod';
import { ApiTags } from '@nestjs/swagger';

const updateBodySchema = z.object({
  addresse: z.string(),
  pictureId: z.string(),
});

type UpdateBodySchema = z.infer<typeof updateBodySchema>;

@ApiTags("updateshipment/:id/:mailmanId")
@Controller()
export class UpdateShipmentController {
  constructor(
    private updatedShipmentUseCase: UpdatedShipmentUseCase, // Injeta o use case
  ) {}

  @Patch('/updateshipment/:id/:mailmanId')
  @HttpCode(200)
  async handle(@Body() body: UpdateBodySchema, @Param('id') id: string, @Param('mailmanId') mailmanId: string) {
    const { addresse, pictureId } = body;

 
    if (!id) {
      throw new BadRequestException('id is required');
    }

    if (!pictureId) {
      throw new BadRequestException('Picture is necessary!');
    }
 
     
      await this.updatedShipmentUseCase.execute(
        { id },  
        { 
          addresse, 
          recipientId: id,      
          password: '',      
          cpf: '',           
          name: '',
          updatedAt: new Date(),
        }
      );
    

    return { message: 'Updated shipment' };
  }
}
