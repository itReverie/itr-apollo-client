import React, {Component} from 'react';
import PropTypes from 'prop-types';
import more from '../../images/more.svg';
import favorite from '../../images/star.svg';
import './messageElement.style.css';

export default class Message extends Component{

    render(){
        return(<div className="message-container">
            <div>{this.props.text}</div> 
            <div className="moreActions-container">
                <img src={favorite} className="favorite-icon"/>
                <img src={more} className="more-icon" />
            </div>
        </div>);
    }
}

Message.propTypes={
    text: PropTypes.string.isRequired
}