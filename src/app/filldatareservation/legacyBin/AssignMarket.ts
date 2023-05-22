export function AssignMarket(_MarketsAfiliation: any, marketDefault: string) {
  var MarketContractDefault = ''
  //MarketContractDefault = _MarketsAfiliation[0].Market_code;
  if (_MarketsAfiliation.length == 1) MarketContractDefault = _MarketsAfiliation[0].Market_code
  else {
    if (_MarketsAfiliation.length > 1) MarketContractDefault = marketDefault
  }
  return MarketContractDefault
}
