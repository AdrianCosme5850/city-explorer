import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
class Weather extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cityForecast: []
        }
    }
    handleSubmitWeather = async(event) => {
        event.preventDefault();
        console.log(URL)
        let responseWeather = await axios.get(`http://${process.env.REACT_APP_SERVER}/weather?city=${this.props.city}`);
        this.setState({
            cityForecast: responseWeather.data,
        })
    }
    render(){
        return<>
         <Form onSubmit={this.handleSubmitWeather}>
    <Button type="submit">Weather</Button>
    </Form>
    <ul>
     <li>{this.state.cityForecast.date}</li>
     <li>{this.state.cityForecast.description}</li>
    </ul>
        </>
    }
}

export default Weather;