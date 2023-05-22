export default interface ReservationsDto {
  company: string
  application: string
  ent_date: string
  hotel: string
  folioClub: string
  status: string
  first_name?: string
  firstName?: string
  last_name?: string
  lastName?: string
  nights: string
  rm_type: string
  arv_date?: string
  ent_time: string
  arvDate?: string
  depart_dt?: string
  departDt?: string
  rooms: string
  adult: string
  child: string
  kid: string
  baby: string
  resort: string
  xtra_adu: string
  xtra_chd: string
  xtra_kid: string
  totalReserv: string
  category: string
  categoryId: string
  balance: string
  Paid: string
  Refundable: string
  tipo: string
  sendPaymentLink?: boolean
  showCountdown?: boolean
  refProgram?: string | null
}
