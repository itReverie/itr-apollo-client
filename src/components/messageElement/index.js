import React from 'react';
import gql from 'graphql-tag';

const MESSAGE_CREATED = gql`
  subscription {
    messageAdded {
      id
      text
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
            messages: [
              ...prev.messages,
              subscriptionData.data.messageCreated,
            ],
          };
        },
      });
    }
  
    render() {
      return (
        <ul>
          {this.props.messages.map(message => (
            <li key={message.id}>{message.text}</li>
          ))}
        </ul>
      );
    }
  }