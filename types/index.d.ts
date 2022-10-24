export interface TreeItem {
  value?: string
  items?: TreeItem[]
}

export interface Tree {
  items?: TreeItem[]
}
