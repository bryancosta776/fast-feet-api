import { Pictures } from "src/infra/auth/core/pictures";

export abstract class PictureRepository {
  abstract create(pictures: Pictures): Promise<Pictures>;
}
