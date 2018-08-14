import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import MessageElement from '../messageElement/';
import {Subscription } from 'react-apollo';


export default class MessageList extends React.Component {
    componentDidMount() {
      this.props.subscribeToMore({
        document: MESSAGE_CREATED,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return {
            allMessages: [
              subscriptionData.data.messageCreated,
              ...prev.allMessages
            ],
          };
        },
      });
    }
  
    render() {
      return (<div>
          {this.props.messages.map(message => {
          return (<div key={message.id}>
            <MessageElement message={message}/>
            <Subscription subscription={MESSAGE_UPDATED}
                            variables={{ id: message.id }}>
                            {() => {return null;}}
              </Subscription>
          </div>)
          })}
        </div>
      );
    }
  }

MessageList.propTypes={ messages: PropTypes.array.isRequired,
                        subscribeToMore: PropTypes.func.isRequired};

const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      id
      text
      isFavorite
    }
  }`;
const MESSAGE_UPDATED = gql`
subscription messageUpdated($id: Int!){
                messageUpdated(id:$id)
		        { 
                    id
    	            text
                    isFavorite
                }
}`;