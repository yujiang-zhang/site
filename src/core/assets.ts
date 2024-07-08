import type { Head, SchemaAugmentations, Unhead } from '@unhead/schema'
import { path } from './utils'
import { pushStyleToHeadByFile } from './css'

export async function autoPushHeadFromPublic(head: Unhead<Head<SchemaAugmentations>>, dir: string) {
  const stylepath = path(dir, 'style.css')
  await pushStyleToHeadByFile(head, stylepath)
}
