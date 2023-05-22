const PEImageBlockAdapter: any = {
  blockToComponent: (response: any) => {
    return {
      id: `${response.__component}-${response.id}`,
      media: {
        mime: response.media.media.data.attributes.mime,
        alt: response.media.altText,
        title: response.media.title,
        url: response.media.media.data.attributes.url
      },
      size: response.size,
      rounded: response.rounded,
    }
  }
}

export { PEImageBlockAdapter };
