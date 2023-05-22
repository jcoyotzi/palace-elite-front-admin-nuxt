import { content } from "~/tailwind.config";
import { GetModalAndContentDto, ModalContent } from "../dto/modalAndContentDto";

export class ModalAndContentMapper {
  static mapModal(modlaObject: GetModalAndContentDto): ModalContent | null {
    if(!modlaObject?.data[0]) return null

    return {
      code: modlaObject.data[0]?.attributes.code,
      title: modlaObject.data[0]?.attributes.title,
      content: modlaObject.data[0]?.attributes.content,
      locale: modlaObject.data[0]?.attributes.locale,
      image: modlaObject.data[0]?.attributes.image,
      video: modlaObject.data[0]?.attributes.video
    }
  }
}
