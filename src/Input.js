import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import PopUp from './PopUp.js'
class Input extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        city: '',
        cityInfo: [],
        mapURL: '',
        showModal: false,
        error: false,
        errorMessage: ''
        }
    }
    handleChange = (event) => {
        this.setState({city: event.target.value})
    }
    handleSubmit = async(event) => {
     try{   event.preventDefault();
      let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
      this.setState({cityInfo: response.data[0], mapURL: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${response.data[0].lat},${response.data[0].lon}&zoom=12`,
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
    <img src={this.state.mapURL} alt='Map'/>
    <PopUp
    error={this.state.error}
    handleClose={this.handleClose}
    message={this.state.errorMessage}/>
    </>
}
}

export default Input;