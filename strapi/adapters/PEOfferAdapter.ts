export function blockToComponent(response: any) {
  return {
    title: response.title,
    content: response.content,
    media: {
      mime: response.media.media.data.attributes.mime,
      alt: response.media.media.data.attributes.alternativeText,
      title: response.media.title,
      url: response.media.media.data.attributes.url
    }
  }
}
