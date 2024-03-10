import React from "react"
import './InputWithLabel.css'


const InputWithLabel= ({name, label, values, errors, regErr, handleChangeWithLoading, type='text'}) => {
    const [errMesage, setErrMesage]= React.useState('')
    React.useEffect(()=>{
      regErr ? setErrMesage(regErr) : setErrMesage(errors)
    },[regErr, errors])
    
    return  (
      <div className="input-with-label">
        <label htmlFor={name} className="input-with-label__name">{label}</label>
        <input type={type} name={name} id={name}className="input-with-label__input" onChange={handleChangeWithLoading} required/>
        <span className="input-with-label__error-mesage">{errMesage}</span>
      </div>
    )
    }

    export default InputWithLabel