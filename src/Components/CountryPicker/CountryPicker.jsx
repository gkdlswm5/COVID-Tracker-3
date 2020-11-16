import React, {useState, useEffect} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core'
import { fetchCountries } from '../../utils/api/index'

import styles from './CountryPicker.module.css';

const CountryPicker = ( { handleCountryChange }) => {

    const [countries, setCountries] = useState([]); 

    useEffect(() => {
        const fetchedData = async () => {
            setCountries(await fetchCountries())
        }

        fetchedData()
    }, [])

    //loops thorugh country names 
    var loop = countries.map((country, i) => {
                return (
                <option value={country} key={i}>{country}</option>
                 )
                })
    

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value='global'>Global</option>
                {loop}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker