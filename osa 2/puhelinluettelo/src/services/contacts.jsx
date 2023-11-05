import axios from 'axios'
const baseUrl = 'http://localhost:3000/persons'

// Get all notes in the database
const getAll = () => {

    // We don't return the promise returned by axios, instead we save it into this request variable
    const request = axios.get(baseUrl)

    // On fulfilled promise we take only the data from the response and return it for easy usage
    // Note that .then returns a promise so we must call .then in App to resolve it
    // The response.data contains ALL the notes as an array
    return request.then(response => response.data)

    // WRITTEN THE LONG WAY
    /*
        const getAll = () => {
        const request = axios.get(baseUrl)

        return request.then(response => {
            return response.data
        })
        }
    */
    
  }

// Add new note to the database
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

  /*
// Replace note with this id with newObject
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

// Remove a note in the database
const deleteNote = (id) => {
  if(window.confirm("Do you really want to delete this note?"))
  {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }
}
  */
// Export this object that allows App.jsx to use our methods
// Because the field and variable names are the same we can combine them for simplicity.
export default {getAll, create}