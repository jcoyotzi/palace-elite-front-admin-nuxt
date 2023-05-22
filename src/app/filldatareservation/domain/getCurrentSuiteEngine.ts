/**
 * @name GetCurrentSuiteEngine
 * @description Funcion que devuelve la habitacion seleccionada en el motor de reservas
 * @todo Booking.js asigna la variable de multi category engine y también selectedRoomCode - Revisar
 */
export function getCurrentSuiteEngine(
  isMultiCategoryEngine: boolean,
  currentSuiteMultiCategory: string,
  selectedRoomCode: string
) {
  return isMultiCategoryEngine ? currentSuiteMultiCategory : selectedRoomCode
}
