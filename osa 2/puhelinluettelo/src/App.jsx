import { useState, useEffect } from 'react'
import contactsServices from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')


  const hook = () => {
    console.log('useEffect')
    contactsServices.getAll().then(contacts => {setPersons(contacts)})
  }
  
  // Call the hook function on first render only to fetch notes from the server
  useEffect(hook, [])


  // Add new contact to the phonebook
  const addName = event => {
    event.preventDefault()

    const nameObj = {
      name: newName,
      number: newNumber
    }

    // Check if there's a person with this name already
    if(!persons.some(person => person.name === newName))
      contactsServices.create(nameObj).then(response => {setPersons(oldPersons => [...oldPersons, response])})
    
    else
      alert("This name is already added to the phonebook")

    

    // Clear name and num fields
    setNewName('')
    setNewNumber('')

  }

  // Event handlers for input field value changes
  const handleNameChange = (event) => {
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)  
  }

  const handleSearchChange = (event) => 
  {
    setSearchTerm(event.target.value)
  }

  const deleteContact = (id) => {
    
    if(window.confirm("Do you really want to delete this contact?"))
    {
      contactsServices.deletePerson(id)

      setPersons(oldPersons => oldPersons.filter(oldPerson => oldPerson.id !== id))
    } 
    /*
       .then(returnedNotes => {
            console.log(returnedNotes)
            setNotes(returnedNotes)
      })*/
  }

  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()) || person.number.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <input className='searchBar' placeholder='Filter Contacts' value={searchTerm} onChange={handleSearchChange}/>

      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          phone: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      {peopleToShow.map((contact) => <div className="personInfo"><p>{contact.name}</p><p>{contact.number}</p><button onClick={() => deleteContact(contact.id)}>Delete</button></div> )}
    </div>
  )

}

export default App