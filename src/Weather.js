import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
class Weather extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    handleSubmitWeather = async(event) => {
        event.preventDefault();
        let responseWeather = await axios.get(`${process.env.REACT_APP_SERVER}/weather?city=${this.props.city}&lat=${this.props.lat}&lon=${this.props.lon}`);
        this.setState({
            cityForecast: responseWeather.data,
        })
    }
    renderWeather = () => {
        let weatherData = this.state.cityForecast.forEach((day) => {
            return <ul>
                <li>{day.date}</li>
                <li>{day.description}</li>
            </ul>
           }
        )
        return weatherData;
    }
    render(){
        return<>
         <Form onSubmit={this.handleSubmitWeather}>
    <Button type="submit">Weather</Button>
    </Form>
    {this.state.cityForecast && <ul>
        <li>{this.state.cityForecast[0].date}</li>
        <li>{this.state.cityForecast[0].description}</li>
        <li>{this.state.cityForecast[1].date}</li>
        <li>{this.state.cityForecast[1].description}</li>
        <li>{this.state.cityForecast[2].date}</li>
        <li>{this.state.cityForecast[2].description}</li>
        </ul>} 
        </>
    }
}

export default Weather;