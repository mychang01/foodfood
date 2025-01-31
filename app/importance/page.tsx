import Image from "next/image"
import { CheckCircle } from "lucide-react"

export default function ImportancePage() {
  const reasons = [
    "Conserves valuable resources like water, energy, and land",
    "Reduces greenhouse gas emissions and combats climate change",
    "Saves money for households and businesses",
    "Helps address global hunger and food insecurity",
    "Preserves biodiversity and ecosystems",
    "Promotes sustainable agriculture practices",
  ]

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">The Importance of Reducing Food Waste</h1>

        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/impact.png"
              alt="Food waste impact illustration"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Why Every Action Counts</h2>
            <p className="text-green-600 mb-4">
              Food waste is a global issue with far-reaching impacts on our environment, economy, and society. By taking
              steps to reduce food waste, we can all contribute to a more sustainable and equitable world.
            </p>
            <p className="text-green-600">Here are some key reasons why reducing food waste is crucial:</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="text-green-600 mr-4 flex-shrink-0 mt-1" />
              <p className="text-green-700">{reason}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Take Action Today</h2>
          <p className="text-green-600 mb-4">
            Every small step towards reducing food waste makes a difference. Here are some simple ways you can start:
          </p>
          <ul className="list-disc list-inside text-green-700 space-y-2">
            <li>Plan your meals and make a shopping list</li>
            <li>Store food properly to extend its shelf life</li>
            <li>Use up leftovers creatively</li>
            <li>Compost food scraps when possible</li>
            <li>Donate excess food to local food banks or charities</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

