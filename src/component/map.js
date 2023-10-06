import React, { useState, useEffect, useMemo } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { useLocation } from 'react-router-dom';

const MapContainer = (props) => {
    const [center, setCenter] = useState(null);
    const [locationArray, setlocationArray] = useState([]);
    const dataLoc = useLocation();

    // Initialize location when dataLoc.state changes
    useEffect(() => {
        if (dataLoc.state) {
            // setLocation();
            setlocationArray(dataLoc.state.list);
            setCenter({ "lat": dataLoc.state.location.lattitude, "lng": dataLoc.state.location.longitude });
        }
    }, []);

    const mapStyles = {
        width: '100%',
        height: '100%'
    };

    return (
        <Map
            google={props.google}
            zoom={14}
            style={mapStyles}
            center={center}
        >
            {locationArray.map((item, index) => (
                <Marker
                    key={index}
                    position={{
                        lat: item.lattitude,
                        lng: item.longitude
                    }}

                />
            ))}

        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC6Igru7ycprT8Pq3Mc_E36lc3ShS2BK9U'
})(MapContainer);
