import React from "react";
import './SubmitButton.css'

const SubmitButton = ({ text, disabled }) => {
    return (
      <button type="submit" className="submit-button" disabled={disabled}>{ text }</button>
    )
}

export default SubmitButton