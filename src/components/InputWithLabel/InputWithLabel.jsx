import React, {useEffect, useState} from "react"
import './InputWithLabel.css'


const InputWithLabel = ({name, label, values, errors, regErr, handleChangeWithLoading, type = 'text', ...rest}) => {
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        setErrMessage(regErr ?? errors);
    }, [regErr, errors])

    return (
      <div className="input-with-label">
        <label htmlFor={name} className="input-with-label__name">{label}</label>
        <input type={type} name={name} id={name} className="input-with-label__input"
          onChange={handleChangeWithLoading} required {...rest}/>
        <span className="input-with-label__error-message">{errMessage}</span>
      </div>
    )
}

export default InputWithLabel