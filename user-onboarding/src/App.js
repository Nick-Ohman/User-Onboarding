import React, {useState, useEffect} from 'react';
import Form from './Form'


import axios from 'axios';
import * as yup from 'yup'

import './App.css';

const url = 'https://reqres.in/api/users'

const intialFormValues = {
  name: '',
  email: '',
  password: '',
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
}


const formSchema ={

}

function App() {
  const [users, setUsers] = useState([])
  const [formValues, setFormValues] = useState(intialFormValues)

  const [formDisabled, setFormDisabled] = useState(true)

  const [formErrors, setFormErrors] = useState(initialFormErrors)
  
  const getUsers = () => {
    axios.get(url)
    .then(res => {
      setUsers(res.data)
    })
    .catch(err =>{
      debugger
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  const postUser = User => {
    axios.post(url, users)
      .then(res => {
        setUsers([...users, res.data])
      })
      .catch(err => {
        debugger
      })
  }

  const onSubmit = evt => {
    evt.preventDefault()

    const newUser = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    }

    postUser(newUser)
    setFormValues(intialFormValues)
  }

  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value
  }

  const onCheckboxChange = evt => {
    const { name } = evt.target
    const isChecked = evt.target.checked

      setFormValues({
        ...formValues,
        [name]: isChecked
      })
  }
  return (
    <div className="App">
      <header className="App-header">
        <Form 
        values={formValues}
        onInputChange={onInputChange}
        onCheckboxChange={onCheckboxChange}
        onSubmit={onSubmit}
        disabled={formDisabled}
        errors={formErrors}
        
        />
      </header>
    </div>
  );
}

export default App;

