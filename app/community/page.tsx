import Link from "next/link"

export default function CommunityPage() {
  // This is just mock data. In a real application, you would fetch this from a database or API
  const recipes = [
    { id: 1, title: "Vegetable Stir Fry", author: "Alice" },
    { id: 2, title: "Leftover Chicken Soup", author: "Bob" },
    { id: 3, title: "Fruit Smoothie Bowl", author: "Charlie" },
  ]

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Community Recipes</h1>

        <div className="text-center mb-8">
          <Link
            href="/community/submit"
            className="bg-green-600 text-white px-6 py-3 rounded-full inline-flex items-center hover:bg-green-700 transition duration-300"
          >
            Submit a Recipe
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-green-700 mb-2">{recipe.title}</h2>
              <p className="text-gray-600">By {recipe.author}</p>
              <Link
                href={`/community/recipe/${recipe.id}`}
                className="mt-4 inline-block text-green-600 hover:underline"
              >
                View Recipe
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

