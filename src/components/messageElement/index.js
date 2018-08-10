import React, {Component} from 'react';
import PropTypes from 'prop-types';
import more from '../../images/more.svg';
import './messageElement.css';
import Star from '../moreActions/star/';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const UPDATE_MESSAGE = gql`
mutation updateMessage($id: Int!,
                       $text: String!, 
                       $isFavorite:Boolean! ){
        updateMessage (id: $id,
                       text: $text, 
                       isFavorite:$isFavorite ){
            id,
            text,
            isFavorite
        } 		
}
`;
export default class Message extends Component{

    render(){
        return(
            <Mutation mutation={UPDATE_MESSAGE} key={this.props.message.id}>
             {updateMessage => (
                <div className="message-container">
                    <div className="text-container">{this.props.message.text}</div> 
                    <div className="moreActions-container">
                        <Star active={this.props.message.isFavorite} 
                                       onClick={() => { updateMessage({ variables: { 
                                                                        id: this.props.message.id, 
                                                                        text: this.props.message.text,
                                                                        isFavorite: !this.props.message.isFavorite } });
                        }}/>
                        <img src={more} alt="more" className="more-icon"/>
                    </div>
                </div>
              )}
           </Mutation>);
    }
}

Message.propTypes={
    message: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}