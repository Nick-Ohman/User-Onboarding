import React from 'react';


function Form(props) {

  const {
    values,
    onInputChange,
    onCheckboxChange,
    onSubmit,
    disabled,
    errors,
    
  } = props

  return (
    <div className="form">
        <div>
            {errors.name}<br></br>
            {errors.email}<br></br>
            {errors.password}<br></br>
            {errors.terms}
        </div>
       <label>Name:&nbsp;
      <input  
          value={values.name}  
          onChange={onInputChange}     
          name='name'
          type='text'
        /></label>
      <label>Email:&nbsp;
      <input
          value={values.email}
          onChange={onInputChange}
          name='email'
          type='text'
        /></label>
        <label>Password:&nbsp;
      <input
          value={values.password}
          onChange={onInputChange}
          name='password'
          type='text'
        /></label>
        <label><input
        checked={values.terms}
        onChange={onCheckboxChange}
        name='terms'
        type="checkbox" /> Terms of Service</label>
        <button type="submit" onClick={onSubmit} disabled={disabled} >submit</button>
    </div>
  );
}

export default Form;
