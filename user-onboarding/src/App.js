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


const formSchema = yup.object().shape( {
  name: yup
    .string()
    .min(3, 'name must have at least 3 characters!')
    .required('name is required!'),
  email: yup
    .string()
    .email('a VALID email is required')
    .required('email is required'),
  password: yup
    .string()
    .min(3, 'password must have at least 3 characters!')
    .required('password is required!'),
    
})

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

  const postUser = user => {
    axios.post(url, user)
      .then(res => {
        setUsers([...users, res.data])
      })
      .catch(err => {
        debugger
      })
  }
  useEffect(() => {
    
    formSchema.isValid(formValues)
      .then(valid => {
        setFormDisabled(!valid)
      })
  }, [formValues])

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
    
    yup
    .reach(formSchema, name)
    .validate(value)
    .then(valid => {
     
      setFormErrors({
        ...formErrors,
        [name]: '',
      })
    })
    .catch(err => {
      
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0]
      })
    })

  setFormValues({
    ...formValues,
    [name]: value,
  })

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

