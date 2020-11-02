import React from 'react';

import './CustomInput.scss';

type Props = {
    placeholder: string,    
    type : string, 
    onChange : Function, 
    value : string,
    enable: boolean
};

const CustomInput = ({ placeholder, type, onChange, value, enable}: Props) => {
    let changeInputEvent = (event: React.ChangeEvent<HTMLInputElement>) => { 
        onChange(event);
    }
    let changeTextareaField = (event: { target: { value: React.SetStateAction<string>; }; }) => { 
        onChange(event);
    };
    return (        
        <div className="input-clip-path-outside">
            { 
                type == "input" || type == "password"? 
                    enable ? 
                    <input placeholder={placeholder} name={name} type={type} value={value} onChange={changeInputEvent} className="input-clip-path-inside"></input>
                    :
                    <input placeholder={placeholder} name={name} type={type} value={value} onChange={changeInputEvent} className="input-clip-path-inside" disabled></input>
                : 
                <textarea placeholder={placeholder} onChange={changeTextareaField} className="input-clip-path-inside"></textarea>
            }
        </div>
    );
};

CustomInput.defaultProps = {
    enable: true,
}

export default CustomInput;


