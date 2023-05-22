export default interface PayloadGetWeeksProvitions {
  invoice?: string
  application: string
  company: number
  title?: string
  status?: string
  isNational: boolean | null
}
