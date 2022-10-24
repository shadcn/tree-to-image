import { ImageResponse } from "@vercel/og"
import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

import { Tree } from "@/components/tree"

export const config = {
  runtime: "experimental-edge",
}

export default async function handler(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "POST") {
      throw new Error()
    }

    const body = await req.json()

    const factor = 3
    const width = 768 * factor
    const height = body.depth * 36 * factor

    return new ImageResponse(
      <Tree tree={body.tree} width={width} height={height} />,
      {
        width,
        height,
      }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      })
    }

    return new Response(null, {
      status: 500,
    })
  }
}
