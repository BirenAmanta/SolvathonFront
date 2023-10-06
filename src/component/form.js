import React, { useState, useEffect } from 'react';
// import { GetState, GetCity } from "react-country-state-city";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './form.css';
const LocationSelect = ({ label, Id, onChange, options, value }) => {
    return (
        <FormControl fullWidth variant="outlined" className='input-form-control'>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                onChange={onChange}
                value={value}
            >
                {options.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default LocationSelect;
