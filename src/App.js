import React from 'react';
import Weather from './Weather.js';
import axios from 'axios';
import PopUp from './PopUp.js';
import CityInput from './CityInput.js';
import MovieData from './MovieData.js';
import Card from 'react-bootstrap/Card';
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        city: '',
        cityInfo: [],
        mapURL: '',
        cardShow: false,
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
        cardShow: true,
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
    handleChange={this.handleChange}/>
    <Weather
    lon={this.state.cityInfo.lon}
    lat={this.state.cityInfo.lat}
    city={this.state.city}/>
    <PopUp
    error={this.state.error}
    handleClose={this.handleClose}
    message={this.state.errorMessage}/>
    <MovieData
    city={this.state.city}/>
    {this.state.cardShow === true && <Card style={{width: "18rem"}}>
    <Card.Img src={this.state.mapURL} alt="Map of searched city."/>
    <Card.Body>
        <Card.Title>{this.state.cityInfo.display_name}</Card.Title>
        <Card.Body>{this.state.cityInfo.display_name} has a lattitude of {this.state.cityInfo.lat} and
        a longitude of {this.state.cityInfo.lon}</Card.Body>
    </Card.Body>
</Card>}
    </>
}
}

export default App;