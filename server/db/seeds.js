use calorie_tracker;

db.meals.insertMany([
  {
    "date":"11-05-2020",
    "dailyCalories":3831,
    "caloriesLeft":-669,
    "caloriesEntered":4500,
    "breakfast":{"oatmeal":500,"banana":100,"porridge":360,"apple":230,"pear":100,"grape":50},
    "lunch":{"chicken":500,"burger":600,"sandwich":100,"yoghurt":50,"bacon":10,"bread":30},
    "dinner":{"steak":1000,"lamb":550,"pork":300,"avocado":20}
  },
  {
    "date":"12-05-2020",
    "dailyCalories":3831,
    "caloriesLeft":2231,
    "caloriesEntered":1600,
    "breakfast":{"oatmeal":100},
    "lunch":{"burger":500},
    "dinner":{"steak":1000}
  }
]);
