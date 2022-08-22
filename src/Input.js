import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
class Input extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        city: '',
        cityInfo: []
        }
    }
    handleChange = (event) => {
        this.setState({city: event.target.value})
    }
    handleSubmit = async(event) => {
        event.preventDefault();
      let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
      this.setState({cityInfo: response.data[0]});
      console.log(response.data[0])
    }
render(){
    return<>
    <Form onSubmit={this.handleSubmit}>
        <Form.Group>
        <Form.Label>Find a City!</Form.Label>
        <input onChange={this.handleChange}></input>
        <Button type="submit">Explore!</Button>
        </Form.Group>
    </Form>
        <h1>{this.state.cityInfo.display_name}</h1>
    <ul>
        <li>{this.state.cityInfo.lat}</li>
        <li>{this.state.cityInfo.lon}</li>
    </ul>
    </>
}
}

export default Input;