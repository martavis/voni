import React, { useEffect, useState } from 'react';
import gqlClient from 'utils/gqlClient';
import { GET_SHOP_DATA } from 'utils/gqlQuery';
import AsyncSelect from 'react-select/async';
import { COUNTRIES } from 'utils/constants';

import './CustomCountrySelect.scss';

type Props = {
    onChange : Function, 
    value : any
};

const CustomCountrySelect = ({ onChange, value }: Props) => {
    const [countries, setCountries] = useState([]);
    const [inputValue, setInputValue] = useState({
        label: '', value: ''
    });

    useEffect( () => { 
        getAvailableCountries();
    }, []);

    useEffect( () => {
        setInputValue({
            label: value.name, 
            value: value.code
        });
    }, value);

    let getAvailableCountries = async () => {
        const { data: { shop: { shipsToCountries } } } = await gqlClient.query({
            query: GET_SHOP_DATA,
            fetchPolicy: 'no-cache'
        });

        const options = shipsToCountries.map((code) => {
            const name = COUNTRIES[code];
            return { value: code, label: name };
        })
        setCountries(options);
    }

    const loadOptions = (value: string, callback: Function) => {
        setTimeout(() => {
            callback(filterCountries(value));
        }, 1000);
    };

    const filterCountries = (inputValue: string) => {
        // return countries.filter(i =>
        //     i.label.toLowerCase().includes(inputValue.toLowerCase())
        // );
        return countries;
    };

    let handleChange = (value : any)=> {
        setInputValue(value);
        onChange(value);
    };

    return ( 
        <div className="customSelectCountries">
            {
                countries.length > 0 && <AsyncSelect
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                    classNamePrefix="react-select"
                    theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary25: 'primary75',
                            primary: 'black',
                        },
                    })} 
                    value = {inputValue}
                    onChange={(option) => { handleChange(option) } }
                />
            }
        </div>
    )    
}

export default CustomCountrySelect;