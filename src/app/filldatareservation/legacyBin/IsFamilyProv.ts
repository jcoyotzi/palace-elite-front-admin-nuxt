export function IsFamilyProv(_FamilyProvs: any[], prov: any, _ProvID: any) {
  //Si no se manda nada se toma lo que tiene en memoria
  prov = prov == undefined || prov == null ? _ProvID : prov
  return _FamilyProvs.includes(prov)
}
