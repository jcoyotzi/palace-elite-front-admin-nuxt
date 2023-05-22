export function AgregarDias(Fecha: any, Dias: number) {
  //Modificamos la Fecha
  var Nueva = new Date(Fecha)
  //Nueva.setDate(Fecha.getDate() + Dias);
  Nueva.setDate(Nueva.getDate() + Dias)

  // regresamos el resultado
  return Nueva
} // function AgregarDias(Fecha,Dias)
