export function blockToComponent(response: any) {
  return {
    content: response.description,
    extra: 'description'
  }
}
