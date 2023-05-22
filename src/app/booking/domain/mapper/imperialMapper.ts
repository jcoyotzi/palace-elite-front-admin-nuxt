import { ImperialDto } from "../dto/imperialDto";
import { ImperialEntity } from "../entities/imperialEntity";

export class ImperialMapper {
  public static mapToImperialEntity(imperial: ImperialDto): ImperialEntity {
    return imperial
  }
}