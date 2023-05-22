const PETitleContentTripleAdapter: any = {
  blockToComponent(response: any) {
    return {
      id: `${response.__component}-${response.id}`,
      title1: response.titleTop,
      text1: response.descriptionTop,
      title2: response.titleLeft,
      text2: response.descriptionLeft,
      title3: response.titleRight,
      text3: response.descriptionRight,
      ukNights: response.nights[0].content,
      ukPrice: response.nights[0].price,
      worldNights: response.nights[1].content,
      worldPrice: response.nights[1].price,
      worldNights2: response.nights[2].content,
      worldPrice2: response.nights[2].price
    }
  }
}

export { PETitleContentTripleAdapter };
