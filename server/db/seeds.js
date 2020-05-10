use calorie_tracker;
db.dropDatabase();

db.person.insertMany([
  {
    name: "Joe",
    height: 184,
    weight: 100,
    gender: 'male',
    age: 40,
    dailyCalories: 2750,
    caloriesLeft: 2750,
    caloriesEntered: 0
  }
]);

db.meals.insertMany([
{"_id":{"$oid":"5eb70393266522068d93c912"},"date":"09-05-2020","caloriesLeft":-669,"caloriesEntered":4500,"breakfast":{"oatmeal":500,"banana":100,"porridge":360,"apple":230,"pear":100,"grape":50},"lunch":{"chicken":500,"burger":600,"sandwich":100,"yoghurt":50,"bacon":10,"bread":30},"dinner":{"steak":1000,"lamb":550,"pork":300,"avocado":20}}
]);

db.foods.insertMany([
  {
    sausages: 100,
    steak: 300,
    chips: 500
  }
]);
