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
  {
    date: "08/05/2020",
    breakfast: {sausages: 100},
    lunch: {burger: 200},
    dinner: {chicken: 100}
  },
  {
    date: "09/05/2020",
    breakfast: {beans: 100},
    lunch: {peas: 200},
    dinner: {haggis: 100}
  }
]);

db.foods.insertMany([
  {
    sausages: 100,
    steak: 300,
    chips: 500
  }
]);
