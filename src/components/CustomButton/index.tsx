import React from 'react';

import './CustomButton.scss';

type Props = {
    buttonText: string, 
    submit : Function,
};

const CustomButton = ({ buttonText, submit }: Props) => {
    let buttonClick = ( event: React.MouseEvent<HTMLButtonElement> ) => { 
        submit();
    }
    return (
        <div className="button-clip-path-outside">
            <button className="button-clip-path-inside" onClick={buttonClick}> 
                { buttonText }
            </button>            
        </div>       
    );
};

export default CustomButton;


