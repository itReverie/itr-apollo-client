import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './messageElement.css';
import Star from '../moreActions/star/';
import gql from 'graphql-tag';
import { Mutation, Subscription } from 'react-apollo';

export default class MessageElement extends Component{

    componentDidMount() {
        this.messageUpdatedSubscription();
    }

    messageUpdatedSubscription = () => (
        <Subscription
          subscription={MESSAGE_UPDATED}>
          {({ data: { messageUpdated } }) => (
            console.log(messageUpdated)
          )}
        </Subscription>
      );
    
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
                    </div>
                </div>
              )}
           </Mutation>);
    }
}

MessageElement.propTypes={
    message: PropTypes.object.isRequired,
}

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
}`;

const MESSAGE_UPDATED = gql`
   subscription messageUpdated{
                messageUpdated
		        { 
                    id
    	            text
                    isFavorite
                }
}`;