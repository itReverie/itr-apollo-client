import React from 'react';
import gql from 'graphql-tag';
import Message from '../messageElement/';

const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      id
      text
      isFavorite
    }
  }
`;

export default class MessageElement extends React.Component {
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
            <Message key={message.id} message={message} />
          ))}
        </div>
      );
    }
  }