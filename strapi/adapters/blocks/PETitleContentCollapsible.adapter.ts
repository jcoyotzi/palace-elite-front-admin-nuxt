const PETitleContentCollapsibleAdapter: any = {
  blockToComponent: (response: any) => {
    return {
      id: `${response.__component}-${response.id}`,
      title: response.title,
      content: response.content
    }
  }
}

export { PETitleContentCollapsibleAdapter };