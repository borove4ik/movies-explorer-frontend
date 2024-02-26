import React from "react"
import './InputWithLabel.css'


const InputWithLabel= ({name, label}) => {
    return  (
      <div className="input-with-label">
        <label htmlFor={name} className="input-with-label__name">{label}</label>
        <input type="text" name={name} id={name}className="input-with-label__input" />
        <span className="input-with-label__error-mesage"></span>
      </div>
    )
    }

    export default InputWithLabel