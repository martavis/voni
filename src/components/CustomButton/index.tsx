import React from 'react';

import './CustomButton.scss';

type Props = {
    buttonText: string, 
    submit: Function,
    isDisabled?: boolean
};

const CustomButton = ({ buttonText, submit, isDisabled }: Props) => {
    let buttonClick = ( event: React.MouseEvent<HTMLButtonElement> | React.SyntheticEvent ) => { 
        submit(event);
    }

    return (
        <div className="button-clip-path-outside">
            <button className="button-clip-path-inside" onClick={buttonClick} disabled={isDisabled}> 
                { buttonText }
            </button>            
        </div>       
    );
};

export default CustomButton;


