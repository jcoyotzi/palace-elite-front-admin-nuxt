export function blockToComponent(response: any) {
  return {
    title: response.title,
    awards: response.awards
  }
}
