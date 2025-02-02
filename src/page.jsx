"use client";
import React from "react";
import { useState } from 'react';

function MainComponent() {
  const [user, setUser] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);
  const [movementData, setMovementData] = useState([]);
  const [storeLayout, setStoreLayout] = useState(null);
  const [showRecipeSearch, setShowRecipeSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedPricePattern, setSelectedPricePattern] = useState("budget");
  const [loading, setLoading] = useState(false);
  const [chatGptRecipes, setChatGptRecipes] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [analytics, setAnalytics] = useState({
    popularIngredients: {
      Eggs: { count: 12, lastPurchased: "2025-01-15" },
      Milk: { count: 10, lastPurchased: "2025-01-16" },
      Bread: { count: 8, lastPurchased: "2025-01-17" },
      Chicken: { count: 7, lastPurchased: "2025-01-14" },
    },
    totalSpent: 0,
    recipesSelected: [],
    weeklyPromotions: [
      {
        item: "Fresh Organic Strawberries",
        discount: "30% off",
        validUntil: "2025-02-01",
      },
      {
        item: "Premium Ground Coffee",
        discount: "Buy 1 Get 1 Free",
        validUntil: "2025-01-31",
      },
      {
        item: "Whole Grain Bread",
        discount: "$1 off",
        validUntil: "2025-01-30",
      },
      {
        item: "Greek Yogurt",
        discount: "2 for $5",
        validUntil: "2025-02-02",
      },
    ],
    aisleSpending: {
      dairy: 145.99,
      meat: 287.5,
      vegetables: 98.75,
      fruit: 76.25,
      canned: 54.99,
      bread: 42.5,
      frozen: 167.85,
    },
    aisleTimeSpent: {
      dairy: 25,
      meat: 35,
      vegetables: 20,
      fruit: 15,
      canned: 10,
      bread: 8,
      frozen: 30,
    },
    routesTaken: [
      {
        date: "2025-01-17",
        path: ["entrance", "dairy", "frozen", "checkout"],
        timeSpent: 15,
      },
      {
        date: "2025-01-16",
        path: ["entrance", "meat", "bread", "checkout"],
        timeSpent: 12,
      },
      {
        date: "2025-01-15",
        path: ["entrance", "canned", "frozen", "checkout"],
        timeSpent: 18,
      },
      {
        date: "2025-01-14",
        path: ["entrance", "vegetables", "dairy", "checkout"],
        timeSpent: 20,
      },
      {
        date: "2025-01-13",
        path: ["entrance", "fruit", "meat", "checkout"],
        timeSpent: 14,
      },
      {
        date: "2025-01-12",
        path: ["entrance", "bread", "dairy", "checkout"],
        timeSpent: 16,
      },
      {
        date: "2025-01-11",
        path: ["entrance", "frozen", "meat", "checkout"],
        timeSpent: 19,
      },
      {
        date: "2025-01-10",
        path: ["entrance", "vegetables", "frozen", "checkout"],
        timeSpent: 13,
      },
    ],
  });
  const mockRecipes = [
    {
      id: 1,
      name: "Spaghetti Carbonara",
      lastPurchased: "2025-01-15",
      purchaseCount: 3,
      ingredients: [
        {
          name: "Spaghetti",
          price: [3.99, 5.99, 7.99],
          dietary: ["Vegan Option Available"],
          expiry: "2025-03-20",
          aisle: "pasta",
          coordinates: { x: 708, y: 226 },
        },
        {
          name: "Eggs",
          price: [2.99, 4.99],
          dietary: ["Non-Vegan"],
          expiry: "2025-02-28",
          aisle: "dairy",
          coordinates: { x: 381, y: 205 },
        },
        {
          name: "Parmesan",
          price: [4.99, 8.99],
          dietary: ["Vegetarian"],
          expiry: "2025-03-15",
          aisle: "dairy",
          coordinates: { x: 381, y: 205 },
        },
      ],
    },
    {
      id: 2,
      name: "Chicken Stir Fry",
      lastPurchased: "2025-01-16",
      purchaseCount: 5,
      ingredients: [
        {
          name: "Chicken Breast",
          price: [6.99, 9.99],
          dietary: ["Non-Vegan"],
          expiry: "2025-02-25",
          aisle: "meat",
          coordinates: { x: 674, y: 115 },
        },
        {
          name: "Mixed Vegetables",
          price: [3.99, 5.99],
          dietary: ["Vegan"],
          expiry: "2025-02-28",
          aisle: "vegetables",
          coordinates: { x: 297, y: 607 },
        },
        {
          name: "Soy Sauce",
          price: [2.99],
          dietary: ["Vegan"],
          expiry: "2025-06-30",
          aisle: "condiments",
          coordinates: { x: 545, y: 189 },
        },
      ],
    },
    {
      id: 3,
      name: "Vegetarian Buddha Bowl",
      lastPurchased: "2025-01-14",
      purchaseCount: 2,
      ingredients: [
        {
          name: "Quinoa",
          price: [4.99, 6.99],
          dietary: ["Vegan"],
          expiry: "2025-12-31",
          aisle: "grains",
          coordinates: { x: 597, y: 226 },
        },
        {
          name: "Chickpeas",
          price: [1.99, 3.99],
          dietary: ["Vegan"],
          expiry: "2025-12-31",
          aisle: "canned",
          coordinates: { x: 648, y: 187 },
        },
        {
          name: "Sweet Potato",
          price: [1.99, 3.49],
          dietary: ["Vegan"],
          expiry: "2025-03-10",
          aisle: "vegetables",
          coordinates: { x: 297, y: 605 },
        },
        {
          name: "Avocado",
          price: [1.99, 2.99],
          dietary: ["Vegan"],
          expiry: "2025-03-05",
          aisle: "produce",
          coordinates: { x: 515, y: 568 },
        },
      ],
    },
    {
      id: 4,
      name: "Homemade Pizza",
      lastPurchased: "2025-01-17",
      purchaseCount: 4,
      ingredients: [
        {
          name: "Pizza Dough",
          price: [2.99, 4.99],
          dietary: ["Vegetarian"],
          expiry: "2025-03-07",
          aisle: "bread",
          coordinates: { x: 380, y: 355 },
        },
        {
          name: "Mozzarella",
          price: [3.99, 6.99],
          dietary: ["Vegetarian"],
          expiry: "2025-03-15",
          aisle: "dairy",
          coordinates: { x: 381, y: 205 },
        },
        {
          name: "Tomato Sauce",
          price: [1.99, 3.99],
          dietary: ["Vegan"],
          expiry: "2025-06-30",
          aisle: "canned",
          coordinates: { x: 648, y: 187 },
        },
        {
          name: "Pepperoni",
          price: [4.99, 7.99],
          dietary: ["Non-Vegan"],
          expiry: "2025-03-20",
          aisle: "meat",
          coordinates: { x: 672, y: 115 },
        },
      ],
    },
    {
      id: 5,
      name: "Salmon with Roasted Vegetables",
      lastPurchased: "2025-01-13",
      purchaseCount: 3,
      ingredients: [
        {
          name: "Salmon Fillet",
          price: [9.99, 14.99],
          dietary: ["Non-Vegan"],
          expiry: "2025-03-05",
          aisle: "seafood",
          coordinates: { x: 981, y: 117 },
        },
        {
          name: "Broccoli",
          price: [2.99, 4.99],
          dietary: ["Vegan"],
          expiry: "2025-03-07",
          aisle: "vegetables",
          coordinates: { x: 404, y: 574 },
        },
        {
          name: "Carrots",
          price: [1.99, 3.99],
          dietary: ["Vegan"],
          expiry: "2025-03-10",
          aisle: "vegetables",
          coordinates: { x: 404, y: 574 },
        },
        {
          name: "Lemon",
          price: [0.99, 1.99],
          dietary: ["Vegan"],
          expiry: "2025-03-08",
          aisle: "produce",
          coordinates: { x: 518, y: 567 },
        },
      ],
    },
  ];
  const filteredRecipes = mockRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const calculateOptimalPath = (ingredients) => {
    const entrance = { x: 542, y: 712 };
    const checkout = { x: 806, y: 595 };
    const points = [{ ...entrance, name: "Entrance" }];

    if (ingredients) {
      const uncheckedIngredients = ingredients.filter(
        (ing) => !checkedIngredients.has(ing.name)
      );

      const sortedIngredients = [...uncheckedIngredients].sort(
        (a, b) => b.coordinates.y - a.coordinates.y
      );

      const aisleGroups = {};
      sortedIngredients.forEach((ing) => {
        if (!aisleGroups[ing.aisle]) {
          aisleGroups[ing.aisle] = [];
        }
        aisleGroups[ing.aisle].push(ing);
      });

      Object.values(aisleGroups).forEach((aisleItems) => {
        aisleItems.forEach((ingredient) => {
          points.push({
            x: ingredient.coordinates.x,
            y: ingredient.coordinates.y,
            name: ingredient.name,
          });
        });
      });
    }

    points.push({ ...checkout, name: "Checkout" });
    return points;
  };
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCartPath, setShowCartPath] = useState(false);
  const renderMainContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setShowRecipeSearch(true)}
      >
        <h2 className="text-xl font-bold mb-4 font-roboto text-blue-600">
          Shopping List
        </h2>
        <p className="text-gray-600 font-roboto">
          Click to search recipes and create your shopping list
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-bold mb-4 font-roboto text-blue-600">
          Store Layout
        </h2>
        <div className="relative w-full h-[400px]">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bigjohngrocery.com%2Fwp-content%2Fuploads%2F2016%2F01%2Fstore-directory.jpg&f=1&nofb=1&ipt=eef0f1c103905046be091595b668c88540316585173bdb614ffaee944127658e&ipo=images"
            alt="Store layout"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-bold mb-4 font-roboto text-blue-600">
          Routes Taken
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-semibold mb-2 text-gray-700">Aisle Spending</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(analytics.aisleSpending).map(
                ([aisle, amount]) => (
                  <div
                    key={aisle}
                    className="bg-white p-3 rounded-lg shadow-sm"
                  >
                    <span className="font-medium text-blue-600 capitalize">
                      {aisle}
                    </span>
                    <div className="text-sm text-gray-600">
                      ${amount.toFixed(2)}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-semibold mb-2 text-gray-700">
              Time Spent per Aisle
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(analytics.aisleTimeSpent).map(
                ([aisle, minutes]) => (
                  <div
                    key={aisle}
                    className="bg-white p-3 rounded-lg shadow-sm"
                  >
                    <span className="font-medium text-blue-600 capitalize">
                      {aisle}
                    </span>
                    <div className="text-sm text-gray-600">
                      {minutes} minutes
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-semibold mb-2 text-gray-700">Recent Routes</h3>
            <div className="space-y-2">
              {analytics.routesTaken.slice(0, 4).map((route, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="font-medium text-blue-600">{route.date}</div>
                  <div className="text-sm text-gray-600">
                    Time: {route.timeSpent} mins
                  </div>
                  <div className="text-xs text-gray-500">
                    Path: {route.path.join(" → ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-bold mb-4 font-roboto text-blue-600">
          Shopping Analytics
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-semibold mb-2 text-gray-700">
              Favorite Products
            </h3>
            <div className="space-y-3">
              {mockRecipes
                .sort((a, b) => b.purchaseCount - a.purchaseCount)
                .slice(0, 4)
                .map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-blue-600">
                          {recipe.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Purchased {recipe.purchaseCount} times
                        </div>
                        <div className="text-xs text-gray-400">
                          Last bought: {recipe.lastPurchased}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (!cart.find((r) => r.id === recipe.id)) {
                            setCart([...cart, recipe]);
                          }
                        }}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-full text-sm transition-colors"
                      >
                        Buy Again
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-semibold mb-2 text-gray-700">Popular Items</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(analytics.popularIngredients).map(
                ([item, data]) => (
                  <div key={item} className="bg-white p-3 rounded-lg shadow-sm">
                    <span className="font-medium text-blue-600">{item}</span>
                    <div className="text-sm text-gray-600">
                      Bought {data.count} times
                    </div>
                    <div className="text-xs text-gray-500">
                      Last: {data.lastPurchased}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-semibold mb-2 text-gray-700">
              Weekly Promotions
            </h3>
            <div className="space-y-2">
              {analytics.weeklyPromotions.map((promo, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="font-medium text-blue-600">{promo.item}</div>
                  <div className="text-sm text-green-600 font-bold">
                    {promo.discount}
                  </div>
                  <div className="text-xs text-gray-500">
                    Valid until {promo.validUntil}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-semibold mb-2 text-gray-700">
              Shopping Patterns
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                <span className="text-gray-600">Average Time Spent:</span>
                <span className="font-medium text-blue-600">15 minutes</span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                <span className="text-gray-600">Most Active Day:</span>
                <span className="font-medium text-blue-600">Wednesday</span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                <span className="text-gray-600">Busiest Time:</span>
                <span className="font-medium text-blue-600">
                  2:00 PM - 4:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const renderRecipeSearch = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <button
          onClick={() => {
            setShowRecipeSearch(false);
            setSelectedRecipe(null);
          }}
          className="text-blue-600 hover:text-blue-800 mr-4 transition-colors"
        >
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <h2 className="text-2xl font-bold font-roboto">Recipe Search</h2>
      </div>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search for recipes or ask ChatGPT for suggestions..."
          className="w-full p-4 border rounded-lg pr-12 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={async () => {
            setLoading(true);
            const response = await fetch("/api/chatgpt", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                prompt: `Suggest a recipe for: ${searchQuery}. Include ingredients with approximate prices and dietary information.`,
              }),
            });
            const data = await response.json();
            setChatGptRecipes([...chatGptRecipes, data]);
            setLoading(false);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <i className="fas fa-magic text-xl"></i>
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!selectedRecipe ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecipes.map((recipe) => {
              const budgetPrice = recipe.ingredients.reduce(
                (total, ing) => total + ing.price[0],
                0
              );
              const moderatePrice = recipe.ingredients.reduce(
                (total, ing) =>
                  total + ing.price[Math.floor(ing.price.length / 2)],
                0
              );
              const premiumPrice = recipe.ingredients.reduce(
                (total, ing) => total + ing.price[ing.price.length - 1],
                0
              );

              return (
                <div
                  key={recipe.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <h3
                      className="text-lg font-semibold font-roboto text-blue-600 cursor-pointer"
                      onClick={() => setSelectedRecipe(recipe)}
                    >
                      {recipe.name}
                    </h3>
                    <button
                      onClick={() => {
                        if (!cart.find((r) => r.id === recipe.id)) {
                          setCart([...cart, recipe]);
                        }
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <i className="fas fa-cart-plus text-xl"></i>
                    </button>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="text-sm text-gray-600">
                      {recipe.ingredients.length} ingredients
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-green-600">
                        Budget: ${budgetPrice.toFixed(2)}
                      </div>
                      <div className="text-blue-600">
                        Moderate: ${moderatePrice.toFixed(2)}
                      </div>
                      <div className="text-purple-600">
                        Premium: ${premiumPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {chatGptRecipes.map((recipe, index) => (
              <div
                key={`chatgpt-${index}`}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 hover:shadow-md bg-gradient-to-r from-blue-50 to-white"
              >
                <div className="flex items-center gap-2 mb-2">
                  <i className="fas fa-magic text-blue-600"></i>
                  <h3 className="text-lg font-semibold font-roboto text-blue-600">
                    {recipe.name}
                  </h3>
                </div>
                <div className="text-sm text-gray-600">AI Generated Recipe</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn">
          <h3 className="text-xl font-bold mb-4 font-roboto text-blue-600">
            {selectedRecipe.name}
          </h3>
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Select Price Pattern:</h4>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedPricePattern("budget")}
                  className={`px-4 py-2 rounded transition-all duration-200 ${
                    selectedPricePattern === "budget"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Budget
                </button>
                <button
                  onClick={() => setSelectedPricePattern("moderate")}
                  className={`px-4 py-2 rounded transition-all duration-200 ${
                    selectedPricePattern === "moderate"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Moderate
                </button>
                <button
                  onClick={() => setSelectedPricePattern("premium")}
                  className={`px-4 py-2 rounded transition-all duration-200 ${
                    selectedPricePattern === "premium"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Premium
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-green-600">
                    Budget
                  </div>
                  <div className="text-lg font-semibold text-green-700">
                    $
                    {selectedRecipe.ingredients
                      .reduce((total, ing) => total + ing.price[0], 0)
                      .toFixed(2)}
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-blue-600">
                    Moderate
                  </div>
                  <div className="text-lg font-semibold text-blue-700">
                    $
                    {selectedRecipe.ingredients
                      .reduce(
                        (total, ing) =>
                          total + ing.price[Math.floor(ing.price.length / 2)],
                        0
                      )
                      .toFixed(2)}
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-purple-600">
                    Premium
                  </div>
                  <div className="text-lg font-semibold text-purple-700">
                    $
                    {selectedRecipe.ingredients
                      .reduce(
                        (total, ing) => total + ing.price[ing.price.length - 1],
                        0
                      )
                      .toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setCheckedIngredients(new Set())}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-4">
            <div className="relative w-full h-[800px] border rounded-lg mb-4 overflow-hidden shadow-lg">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bigjohngrocery.com%2Fwp-content%2Fuploads%2F2016%2F01%2Fstore-directory.jpg&f=1&nofb=1&ipt=eef0f1c103905046be091595b668c88540316585173bdb614ffaee944127658e&ipo=images"
                alt="Store layout"
                className="w-full h-full object-contain"
              />
              {renderPath(calculateOptimalPath(selectedRecipe.ingredients))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedRecipe.ingredients.map((ingredient, index) => {
                const priceIndex =
                  selectedPricePattern === "budget"
                    ? 0
                    : selectedPricePattern === "moderate"
                    ? Math.floor(ingredient.price.length / 2)
                    : ingredient.price.length - 1;
                return (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                      checkedIngredients.has(ingredient.name)
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold font-roboto text-blue-600">
                        {ingredient.name}
                      </h4>
                      <button
                        onClick={() => {
                          const newChecked = new Set(checkedIngredients);
                          if (newChecked.has(ingredient.name)) {
                            newChecked.delete(ingredient.name);
                          } else {
                            newChecked.add(ingredient.name);
                          }
                          setCheckedIngredients(newChecked);
                        }}
                        className="text-xl"
                      >
                        {checkedIngredients.has(ingredient.name) ? "✅" : "⬜"}
                      </button>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Selected Price: </span>
                        <span className="text-blue-600 font-semibold">
                          ${ingredient.price[priceIndex]}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Dietary: </span>
                        {ingredient.dietary.map((diet, i) => (
                          <span
                            key={i}
                            className={`inline-block px-2 py-1 rounded-full text-xs mr-1 ${
                              diet.includes("Vegan")
                                ? "bg-green-100 text-green-800"
                                : diet.includes("Vegetarian")
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {diet}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Expiration: </span>
                        <span className="text-gray-600">
                          {ingredient.expiry}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCart = () => {
    const calculateTotalPrice = (priceLevel) => {
      return cart.reduce((total, recipe) => {
        return (
          total +
          recipe.ingredients.reduce((recipeTotal, ing) => {
            const priceIndex =
              priceLevel === "budget"
                ? 0
                : priceLevel === "moderate"
                ? Math.floor(ing.price.length / 2)
                : ing.price.length - 1;
            return recipeTotal + ing.price[priceIndex];
          }, 0)
        );
      }, 0);
    };

    const feedbackEmojis = {
      happy: "😊",
      okay: "😐",
      sad: "😞",
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-roboto text-blue-600">
              Shopping Cart
            </h2>
            <button
              onClick={() => setShowCart(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty</p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-medium text-green-600">
                    Budget Total
                  </div>
                  <div className="text-lg font-bold text-green-700">
                    ${calculateTotalPrice("budget").toFixed(2)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-blue-600">
                    Moderate Total
                  </div>
                  <div className="text-lg font-bold text-blue-700">
                    ${calculateTotalPrice("moderate").toFixed(2)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-purple-600">
                    Premium Total
                  </div>
                  <div className="text-lg font-bold text-purple-700">
                    ${calculateTotalPrice("premium").toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                {cart.map((recipe, index) => {
                  const budgetPrice = recipe.ingredients.reduce(
                    (total, ing) => total + ing.price[0],
                    0
                  );
                  const moderatePrice = recipe.ingredients.reduce(
                    (total, ing) =>
                      total + ing.price[Math.floor(ing.price.length / 2)],
                    0
                  );
                  const premiumPrice = recipe.ingredients.reduce(
                    (total, ing) => total + ing.price[ing.price.length - 1],
                    0
                  );

                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-semibold text-blue-600">
                            {recipe.name}
                          </h3>
                          <div className="text-sm text-gray-500">
                            Last purchased: {recipe.lastPurchased} (bought{" "}
                            {recipe.purchaseCount} times)
                          </div>
                          <div className="flex gap-2 mt-2">
                            {Object.entries(feedbackEmojis).map(
                              ([mood, emoji]) => (
                                <button
                                  key={mood}
                                  onClick={() =>
                                    setFeedback((prev) => ({
                                      ...prev,
                                      [recipe.id]: mood,
                                    }))
                                  }
                                  className={`text-2xl transition-transform hover:scale-110 ${
                                    feedback[recipe.id] === mood
                                      ? "transform scale-110"
                                      : ""
                                  }`}
                                  aria-label={`Rate ${recipe.name} as ${mood}`}
                                >
                                  {emoji}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setCart(cart.filter((_, i) => i !== index))
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-green-600">
                          Budget: ${budgetPrice.toFixed(2)}
                        </div>
                        <div className="text-blue-600">
                          Moderate: ${moderatePrice.toFixed(2)}
                        </div>
                        <div className="text-purple-600">
                          Premium: ${premiumPrice.toFixed(2)}
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="text-sm font-medium text-gray-700">
                          Frequently Bought Ingredients:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recipe.ingredients.map(
                            (ing, i) =>
                              analytics.popularIngredients[ing.name] && (
                                <div
                                  key={i}
                                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                                >
                                  {ing.name} (
                                  {analytics.popularIngredients[ing.name].count}{" "}
                                  times)
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => setCart([])}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => {
                    setShowCartPath(true);
                    setShowCart(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Show Path
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  const renderCartPath = () => {
    const allIngredients = cart.flatMap((recipe) => recipe.ingredients);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-roboto text-blue-600">
              Optimal Shopping Path
            </h2>
            <button
              onClick={() => setShowCartPath(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          <div className="relative w-full h-[800px] border rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bigjohngrocery.com%2Fwp-content%2Fuploads%2F2016%2F01%2Fstore-directory.jpg&f=1&nofb=1&ipt=eef0f1c103905046be091595b668c88540316585173bdb614ffaee944127658e&ipo=images"
              alt="Store layout with optimal shopping path"
              className="w-full h-full object-contain"
            />
            {renderPath(calculateOptimalPath(allIngredients))}
          </div>
        </div>
      </div>
    );
  };
  const renderPath = (points) => {
    const pathCommands = points
      .map((point, i) => {
        return i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`;
      })
      .join(" ");

    return (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <path
          d={pathCommands}
          stroke="red"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,5"
        />
        {points.map((point, i) => {
          const isAisle = i > 0 && i < points.length - 1;
          return (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill={
                  i === 0 ? "green" : i === points.length - 1 ? "red" : "blue"
                }
              />
              {isAisle && (
                <text
                  x={point.x}
                  y={point.y - 10}
                  textAnchor="middle"
                  className="text-xs fill-current text-blue-600"
                >
                  {point.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setShowRecipeSearch(false);
                setSelectedRecipe(null);
                setShowCart(false);
                setShowCartPath(false);
              }}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-roboto flex items-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <i className="fas fa-home"></i>
              <span className="hidden md:inline">Home</span>
            </button>
            <h1 className="text-2xl font-bold font-roboto">
              Go Go Grocery: Get in, Get Out 🏃‍♂️
            </h1>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => setShowCart(true)}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-roboto flex items-center gap-2"
            >
              <i className="fas fa-shopping-cart"></i>
              <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        {showRecipeSearch ? renderRecipeSearch() : renderMainContent()}
        {showCart && renderCart()}
        {showCartPath && renderCartPath()}
      </main>
    </div>
  );
}

export default MainComponent;