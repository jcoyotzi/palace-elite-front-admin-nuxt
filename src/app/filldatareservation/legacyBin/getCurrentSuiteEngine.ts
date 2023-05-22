export function GetCurrentSuiteEngine(
  _IsMultiCategoryEngine: boolean,
  _CurrentSuiteMultiCategory: string,
  selectedRoom: string
) {
  return _IsMultiCategoryEngine ? _CurrentSuiteMultiCategory : selectedRoom
}
