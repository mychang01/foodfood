'use client'
import { useState, useEffect } from 'react'
import Image from "next/image"
import { Upload, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Recipe {
  name: string
  description: string
  ingredients: string[]
  difficulty: string
}

interface AnalysisResult {
  ingredients: string[]
  recipes: Recipe[]
  nutrition: string
  rawResponse?: string
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setIsLoading(true)
    setAnalysisResult(null)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/analyze-ingredients', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error + (data.details ? `: ${data.details}` : ''))
      }

      if (data.error) {
        throw new Error(data.error + (data.details ? `: ${data.details}` : ''))
      }

      setAnalysisResult(data)
    } catch (error: any) {
      console.error('上传文件时出错:', error)
      setError(error.message || '处理图片时发生错误')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Reduce Food Waste, Save the Planet</h1>
              <p className="text-xl text-green-700 mb-6">
                Reducing food loss and waste is critical to achieving a sustainable world. Join our mission to create a sustainable future by reducing food waste. Every small action counts!
              </p>
              <Link
                href="#upload-section"
                className="bg-green-600 text-white px-6 py-3 rounded-full inline-flex items-center hover:bg-green-700 transition duration-300"
              >
                Get Started
                <ChevronRight className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <Image
                  src="/food.png"
                  alt="Food waste reduction illustration"
                  fill
                  className="rounded-lg shadow-lg object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="upload-section" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
            Let AI scan your food and suggest recipes with nutrition tips
          </h2>
          <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="max-w-md mx-auto mb-8">
              <label htmlFor="image-upload" className="block text-green-700 font-semibold mb-2">
                Upload an image of your ingredients
              </label>
              <div 
                className={`border-2 border-dashed border-green-300 rounded-lg p-4 text-center cursor-pointer hover:border-green-500 transition duration-300 ${
                  isLoading ? 'opacity-50' : ''
                }`}
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                {selectedFile ? (
                  <div className="text-green-600">
                    <p>Selected file: {selectedFile.name}</p>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto text-green-500 mb-2" size={32} />
                    <p className="text-green-600">Click or drag and drop to upload</p>
                  </>
                )}
              </div>
              <input 
                id="image-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload}
                disabled={isLoading}
              />
            </div>

            {analysisResult && (
              <div className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Original Image */}
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold text-green-700 mb-4 text-lg">Your Ingredients:</h3>
                    <div className="relative aspect-video w-full mb-4">
                      <Image
                        src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
                        alt="Uploaded ingredients"
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.ingredients.map((ingredient, index) => (
                        <span 
                          key={index}
                          className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Dishes */}
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold text-green-700 mb-4 text-lg">Recommended Dishes:</h3>
                    <div className="space-y-4">
                      {analysisResult.recipes.map((recipe, index) => (
                        <div 
                          key={index}
                          className="bg-green-50 p-4 rounded-lg"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-green-700 font-semibold text-lg">{recipe.name}</h4>
                            <span className={`
                              px-3 py-1 rounded-full text-sm font-medium ml-2 flex-shrink-0
                              ${recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                                recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'}
                            `}>
                              {recipe.difficulty}
                            </span>
                          </div>
                          <p className="text-green-600 mb-3">{recipe.description}</p>
                          <div>
                            <p className="font-medium text-green-700 mb-2">Key Ingredients:</p>
                            <div className="flex flex-wrap gap-2">
                              {recipe.ingredients.map((ingredient, idx) => (
                                <span 
                                  key={idx}
                                  className="bg-white text-green-600 px-3 py-1 rounded-full text-sm"
                                >
                                  {ingredient}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2">Nutritional Information:</h4>
                      <p className="text-green-600">{analysisResult.nutrition}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-8">Why Reducing Food Waste Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Environmental Impact</h3>
              <p className="text-green-600">
                Reducing food waste helps lower greenhouse gas emissions and conserves resources.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Economic Benefits</h3>
              <p className="text-green-600">Save money on groceries and reduce overall food production costs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Social Responsibility</h3>
              <p className="text-green-600">
                Help address global hunger by ensuring food reaches those who need it most.
              </p>
            </div>
          </div>
          <Link
            href="/importance"
            className="mt-8 inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  )
}

