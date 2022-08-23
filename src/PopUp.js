import React from "react";
import Modal from 'react-bootstrap/Modal';

class PopUp extends React.Component {
    render(){
        return <>
        <Modal show={this.props.error} onHide={this.props.handleClose}>{this.props.message}</Modal></>
    }
}

export default PopUp;