import React from "react";

const TextInput = ({label, value_hook}) => {
    return (
        <div>
          <label htmlFor={label}>{label}</label>
          <input type="text" name={label} value={value_hook[0]} onChange={(e) => value_hook[1](e.target.value)}/>
        </div>
    );
};


export default TextInput;