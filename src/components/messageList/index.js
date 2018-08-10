import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import MessageElement from '../messageElement/';

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
      return (
        <div>
          {this.props.messages.map(message => (
            <MessageElement key={message.id} 
                            message={message}/>
          ))}
        </div>
      );
    }
  }

MessageList.propTypes={
                          messages: PropTypes.array.isRequired,
                          subscribeToMore: PropTypes.func.isRequired
                          }

const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      id
      text
      isFavorite
    }
  }`;