import { Button } from "./common/button"

export interface PEOfferTextWithButtons {
  id: number
  __component: "blocks.title-description-resort",
  title: string,
  description: string
  descriptionWidth: string
  firstButton: Button
  secondButton: Button
}