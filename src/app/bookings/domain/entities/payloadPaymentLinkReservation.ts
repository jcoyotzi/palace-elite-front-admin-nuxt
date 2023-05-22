export default interface PayloadPaymentLinkReservation {
  body: string // Mensaje del correo. Debe contener la cadena de texto "(ENCRYPT_TOKEN)" dentro del mismo
  email: string // Dirección de correo del destinatario
  application: number // Número de Afiliación
  isNational: boolean // Bandera referente a si el socio es nacional o no
  company: number // Company
  hotel: string // Clave del Hotel
  folio: string // Folio de la reservación
  name: string // Nombre del socio
}
