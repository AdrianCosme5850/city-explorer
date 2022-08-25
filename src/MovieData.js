import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class MovieData extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    handleSubmit = async (event) =>{
        event.preventDefault();
        let cityMovies = await axios.get(`http://${process.env.REACT_APP_SERVER}/movie?city=${this.props.city}`);
        this.setState({cityMovies: cityMovies.data});
        console.log(cityMovies.data)
    }
    renderMovies = () => {
    let newArr = this.state.cityMovies.map((movie,idx) => {
        return <li>{movie.title}</li>
    });
    return newArr;
    }
    render(){
    return <>
<Form onSubmit={this.handleSubmit}>
    <Button type="submit">See movies?</Button>
</Form>
{this.state.cityMovies
&&
this.renderMovies()
}
</>
    }
}

export default MovieData;