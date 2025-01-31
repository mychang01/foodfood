import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Debug image information
    console.log('Image type:', image.type)
    console.log('Image size:', image.size)

    try {
      // Convert file to base64
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64Image = buffer.toString('base64')
      
      console.log('Starting OpenAI API call...')
      
      // Call OpenAI Vision API
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Please analyze this food image and provide the following information in a structured format:
                1. List all visible ingredients
                2. Suggest 3-4 possible dishes, including:
                   - Dish name
                   - Brief description
                   - Key ingredients needed
                   - Cooking difficulty (Easy/Medium/Hard)
                3. List main nutritional components
                
                Format your response EXACTLY as follows:
                {
                  "ingredients": ["ingredient1", "ingredient2", ...],
                  "recipes": [
                    {
                      "name": "Dish Name",
                      "description": "Brief description of the dish",
                      "ingredients": ["main ingredient1", "main ingredient2", ...],
                      "difficulty": "Easy/Medium/Hard"
                    }
                  ],
                  "nutrition": "nutrition summary"
                }`
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${image.type};base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      })

      console.log('OpenAI API Response:', response.choices[0].message)

      const content = response.choices[0].message.content
      
      if (!content) {
        throw new Error('No content in response')
      }

      try {
        // Try to extract JSON from the response
        const jsonMatch = content.match(/\{[\s\S]*\}/)
        const jsonStr = jsonMatch ? jsonMatch[0] : content
        const parsedContent = JSON.parse(jsonStr)

        // Validate the response structure
        if (!parsedContent.ingredients || !parsedContent.recipes || !parsedContent.nutrition) {
          throw new Error('Invalid response structure')
        }

        return NextResponse.json(parsedContent)
      } catch (e) {
        console.error('Failed to parse OpenAI response:', content)
        // Return the raw response if JSON parsing fails
        return NextResponse.json({
          ingredients: [],
          recipes: [],
          nutrition: content || 'No analysis available',
          error: 'Failed to parse response into JSON format'
        })
      }

    } catch (error: any) {
      console.error('OpenAI API call failed:', error.message)
      return NextResponse.json(
        {
          error: 'Analysis failed',
          details: error.message,
          code: error.code
        },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('Request processing error:', error)
    return NextResponse.json(
      {
        error: 'Request processing failed',
        details: error.message
      },
      { status: 500 }
    )
  }
} 