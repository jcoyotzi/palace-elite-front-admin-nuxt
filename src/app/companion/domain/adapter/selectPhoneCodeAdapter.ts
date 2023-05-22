/**
 * @description Recibe un objeto donde cada propiedad es un pais.
 * Su key es el código del país, el string separado por comas,
 * lleva el nombre en inglés y el codigo de tel del pais
 */

export interface PhoneEntity {
  name: string
  code: string
}

export const selectPhoneCodeAdapter = (items: {[key: string]: string}): PhoneEntity[] => {
  if (!items) return []
  const countries = Object.values(items)
  return countries.map(country => {
    const split = country.split(',')
    const name = split[0]
    const code = split[1]
    return {
      name,
      code
    }
  })
}
