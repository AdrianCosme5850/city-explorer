import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CityInput extends React.Component {
render(){
    return <>
    <Form onSubmit={this.props.handleSubmitCity}>
    <Form.Group>
    <Form.Label>Find a City!</Form.Label>
    <input onChange={this.props.handleChange}></input>
    <Button type="submit">Explore!</Button>
    </Form.Group>
</Form>
</>
}
}
export default CityInput;