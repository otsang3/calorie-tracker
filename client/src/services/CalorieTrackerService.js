const personUrl = 'http://localhost:3000/api/tracker/person/';
const mealsUrl = 'http://localhost:3000/api/calorieTracker/';

export default {
  getPersonData() {
    return fetch(personUrl)
    .then(res => res.json())
  },

  getMealsData() {
    return fetch(mealsUrl)
    .then(res => res.json())
  },

  postPersonData(payload) {
    return fetch(personUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
  },

  postFoodData(payload) {
    return fetch(foodUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
  },

  postMealsData(payload) {
    return fetch(mealsUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
  },

  updatePersonDetails(payload, id){
    return fetch(personUrl + id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
  },

  updateMealDetails(payload, id){
    return fetch(mealsUrl + id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
  },

  deletePerson(id){
    return fetch(personUrl + id, {method: 'DELETE'})
  },

  deleteAllMeals(){
    return fetch(mealsUrl, {method: 'DELETE'})
  }

}
