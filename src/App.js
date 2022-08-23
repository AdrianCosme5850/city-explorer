import React from 'react';
import Input from './Input.js';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      location: []
    }
  }
  
render(){
  return <>
  <Input/>
  </>
}

}

export default App;