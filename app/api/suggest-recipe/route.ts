import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const image = formData.get("image") as File

  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 })
  }

  // Convert the image to base64
  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64Image = buffer.toString("base64")

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Based on this image of ingredients, suggest a recipe and provide nutritional information.",
            },
            { type: "image", image: `data:image/jpeg;base64,${base64Image}` },
          ],
        },
      ],
    })

    return NextResponse.json({ suggestion: text })
  } catch (error) {
    console.error("Error generating recipe suggestion:", error)
    return NextResponse.json({ error: "Failed to generate recipe suggestion" }, { status: 500 })
  }
}

