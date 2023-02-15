import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import {Button} from "antd";
import Geocode from "react-geocode";

import {LocationArrow, LocationPin} from "assets/images/icons/Icons";

Geocode.setApiKey(process.env.GOOGLE_MAP_API_KEY!);
//Geocode.enableDebug();

class LocationSearchInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            address: '',
            showLoading: false
        };

        /*let script=document.createElement('script');
        script.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&libraries=places`);

        document.body.appendChild(script);*/
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {


        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {

                this.props.history.push(`/unvani-xeritede-sec?address=${address}&lat=${latLng.lat}&lng=${latLng.lng}&zoom=13`);
            })
            .catch(error => console.error('Error', error));
    };

    getCurrentLocation = () => {
        if (window.navigator.geolocation){

            this.setState({
                showLoading: true
            })

            navigator.geolocation.getCurrentPosition((position) => {
                const lat=position.coords.latitude,
                      lng=position.coords.longitude;

                this.setState({
                    showLoading: false
                });

                Geocode.fromLatLng(lat, lng).then(
                    (response) => {
                        const address = response.results[0].formatted_address;

                        this.props.history.push(`/unvani-xeritede-sec?address=${address}&lat=${lat}&lng=${lng}&zoom=13`);
                    },
                    (error) => {
                        console.error(error);
                    }
                );


            })

        }else{
            alert('Unable to retrieve your location')
        }
    }

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className={'full flex direction_column '}>

                        <input
                            {...getInputProps({
                                placeholder: this.props?.placeholder,
                                className: 'ant-input input chooseAdrInput chooseAdrOnMapInput location-search-input',
                            })}
                        />

                        <div className={'flex direction_column full choose_my_place_box'}>
                            <ul className={'flex direction_column full places_list'}>
                                <li>
                                    <Button
                                        htmlType={"button"}
                                        onClick={this.getCurrentLocation}
                                        className={'choose_place_btn flex align_center choose_my_place_btn widthAuto'}
                                        icon={<LocationArrow />}
                                        disabled={this.state.showLoading}
                                        loading={this.state.showLoading}

                                    >
                                        {this.props?.btnText}
                                    </Button>
                                </li>

                                {suggestions.map(suggestion => {
                                   /* const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };*/
                                    return (
                                        <li
                                            {...getSuggestionItemProps(suggestion, {
                                            })}
                                        >
                                            <Button htmlType={"button"} className={'choose_place_btn flex align_center choose_my_place_btn widthAuto'} icon={<LocationPin />} >
                                                {suggestion.description}
                                            </Button>
                                        </li>
                                    );
                                })}
                            </ul>




                        </div>


                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

// @ts-ignore
export default LocationSearchInput;
