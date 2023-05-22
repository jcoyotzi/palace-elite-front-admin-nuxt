import {Component} from 'vue'
import {blocksMappings} from './config/blocks-mappings'
export interface StrapiBlock {
  id: number
  __component: string
  [keys: string]: unknown
}

export interface StrapiComponent {
  id: number
  props: Record<any, any>
  component: string | (() => Component)
  clientOnly: boolean
}

export async function blocksToComponentsAdapter(blocks: StrapiBlock[]) {
  const strapiComponents: StrapiComponent[] = []

  for await (const block of blocks) {
    const blockMapping = blocksMappings.get(block.__component)

    if (blockMapping) {
      strapiComponents.push({
        id: block.id,
        props: await blockMapping.adapter(block),
        component: blockMapping.component,
        clientOnly: blockMapping.clientOnly === true
      })
    }
  }

  return strapiComponents
}
