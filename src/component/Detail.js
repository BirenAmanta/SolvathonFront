import React, { useState, useEffect } from 'react';
import { GetCountries, GetState, GetCity } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";
import { Button } from '@mui/material';
import './detail.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


import LocationSelect from './form';

function Detail() {
    const [countryid, setCountryid] = useState("");
    const [stateid, setStateid] = useState("");
    const [cityid, setCityid] = useState("");
    const [countriesList, setCountriesList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [stateListMap, setStateListMap] = useState(new Map());
    const [cityListMap, setCityListMap] = useState(new Map());
    const [cityList, setCityList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        GetCountries().then((result) => {
            setCountriesList(result);
        });
    }, []);

    const base_url = 'http://127.0.0.1:8000/'
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the page from reloading on submit
        console.log('Submitted!');
        const tempMap = new Map();

        tempMap['country'] = countriesList[countryid].name;
        tempMap['state'] = stateListMap.get(stateid).name;
        tempMap['city'] = cityListMap.get(cityid).name;
        // console.log(cityListMap.get(cityid))

        try {
            const response = await axios.post(`${base_url}api/location`, { body: tempMap });

            navigate('/map', { state: response.data });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        // console.log(tempMap);
    }

    return (
        <div className='mainDiv'>
            {/* <h6>Country</h6>/ */}
            <LocationSelect
                label={"Country"}
                onChange={(e) => {
                    const country = countriesList[e.target.value];
                    console.log(country.name)
                    setCountryid(country.id);
                    const stateMap = new Map();
                    GetState(country.id).then((result) => {
                        setStateList(result)
                        result.map((item, index) => { stateMap.set(item.id, item) });
                    });
                    setStateListMap(stateMap);
                }}
                value={countryid}
                id={countryid}
                options={countriesList}
            />

            <LocationSelect
                label={"State"}
                onChange={(e) => {
                    const selectedState = stateListMap.get(e.target.value); //here you will get full state object.
                    setStateid(selectedState.id);
                    const citymap = new Map();
                    GetCity(countryid, selectedState.id).then((result) => {
                        result.map((item, index) => { citymap.set(item.id, item) });
                        setCityList(result);
                    });
                    setCityListMap(citymap);
                }}
                value={stateid}
                id={stateid}
                options={stateList}
            />

            {/* <h6>City</h6> */}
            <LocationSelect
                label={"City"}
                onChange={(e) => {
                    const city = cityListMap.get(e.target.value); //here you will get full city object.
                    setCityid(city.id);
                }}
                value={cityid}
                id={cityid}
                options={cityList}
            />

            <Button variant="outlined" onClick={handleSubmit}>Fetch</Button>
        </div>
    );
}

export default Detail;
