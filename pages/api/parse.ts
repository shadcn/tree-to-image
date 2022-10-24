import type { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { visit } from "unist-util-visit"
import { remark } from "remark"
import remarkParse from "remark-parse"

import { treeInputSchema } from "@/lib/validations/schema"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      throw new Error()
    }

    const body = treeInputSchema.parse(JSON.parse(req.body))
    const ast = await remark().use(remarkParse).parse(body.source)

    const tree = getItems(ast.children[0], {})

    return res.json({
      tree,
      depth: flatten(tree).length,
    })
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return res.status(422).json(error)
    }

    return res.status(500).end()
  }
}

function getItems(node, current) {
  if (!node) {
    return {}
  }

  if (node.type === "paragraph") {
    visit(node, (item) => {
      if (item.type === "text") {
        current.value = item.value
      }
    })

    return current
  }

  if (node.type === "list") {
    current.items = node.children.map((i) => getItems(i, {}))

    return current
  }

  if (node.type === "listItem") {
    const heading = getItems(node.children[0], {})

    if (node.children.length > 1) {
      getItems(node.children[1], heading)
    }

    return heading
  }

  return {}
}

function flatten({ items }) {
  let result = []
  items?.forEach(function (a) {
    result.push(a)
    if (Array.isArray(a.items)) {
      result = result.concat(flatten({ items: a.items }))
    }
  })
  return result
}
