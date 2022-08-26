import React from 'react';
import Weather from './Weather.js';
import axios from 'axios';
import PopUp from './PopUp.js';
import CityInput from './CityInput.js';
import MovieData from './MovieData.js';
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        city: '',
        cityInfo: [],
        mapURL: '',
        showModal: false,
        error: false,
        errorMessage: '',
        }
    }
    handleChange = (event) => {
        this.setState({city: event.target.value})
    }
    handleSubmitCity = async(event) => {
     try{   event.preventDefault();
      let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
      this.setState({
        cityInfo: response.data[0],
        mapURL: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${response.data[0].lat},${response.data[0].lon}&zoom=12`,
    error: false, errorMessage: ''});
      console.log(this.state.mapURL);
     } catch(error){
        this.setState({error: true, errorMessage: error.message});
     }
    }
    handleClose = () => {
        this.setState({error: false})
    }
render(){
    return<>
    <CityInput
    handleSubmitCity={this.handleSubmitCity}
    handleChange={this.handleChange}
    cityInfo={this.state.cityInfo}/>
    <Weather
    lon={this.state.cityInfo.lon}
    lat={this.state.cityInfo.lat}
    city={this.state.city}/>
    <img src={this.state.mapURL} alt='Map'/>
    <PopUp
    error={this.state.error}
    handleClose={this.handleClose}
    message={this.state.errorMessage}/>
    <MovieData
    city={this.state.city}/>
    </>
}
}

export default App;