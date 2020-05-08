const personUrl = 'http://localhost:3000/api/person'
const foodUrl = 'http://localhost:3000/api/foods'

export default {
  getData() {
    return fetch(baseURL)
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


  deleteBooking(id){
    return fetch(baseURL + id, {method: 'DELETE'})
  },

  updateBooking(payload, id){
    return fetch(baseURL + id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json())
  }

}
