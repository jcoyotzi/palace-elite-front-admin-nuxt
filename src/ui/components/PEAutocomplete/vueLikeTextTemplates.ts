export function vueLikeGetVariables2(template: string): string[] {
  const test = template.match(/([{{A-Za-z0-9.}}]+)/g)
  const varsOnly = test?.filter(item => item.includes('{{'))
  const varNames = varsOnly?.map(item => item.replaceAll('{{', '').replaceAll('}}', ''))
  return varNames!
}

export function vueLikeTemplateReplacer2(
  template: string,
  data: any,
  emptyStringReturn = true
): string {
  const varNames = vueLikeGetVariables2(template)
  let result = template
  // eslint-disable-next-line no-restricted-syntax
  for (const name of varNames) {
    // eslint-disable-next-line no-eval
    let val = eval(`data.${name}`)
    if (val === null || val === undefined) {
      if (emptyStringReturn) {
        return ''
      }
      val = `{{${name}}}`
    }
    result = result.replaceAll(`{{${name}}}`, val)
  }

  return result
}
