import React, {Component} from 'react';
import PropTypes from 'prop-types';
import more from '../../images/more.svg';
import './messageElement.css';
import Star from '../moreActions/star/';


export default class Message extends Component{

    render(){
        return(<div className="message-container">
            <div className="text-container">{this.props.text}</div> 
            <div className="moreActions-container">
                <Star onClick={this.props.onClick}/>
                <img src={more} className="more-icon" />
            </div>
        </div>);
    }
}

Message.propTypes={
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}