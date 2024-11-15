 
import { PrismaService } from "src/application/prisma/prisma.service";
import {  PictureRepository } from "src/application/repositories/picture-repository";
import { PrismaPictureMapper } from "./mappers/prisma-picture-repository-mapper";
import { Pictures } from "../auth/core/pictures";



export class PrismaPictureRepository implements PictureRepository{
    constructor(private prisma: PrismaService){}
    async create(pictureData: Pictures): Promise<Pictures> {
        const picturetoDomain = PrismaPictureMapper.toDomain(pictureData)

        const picture = await this.prisma.picture.create({data: picturetoDomain})


         return PrismaPictureMapper.toDomain(picture)
    }
    
}