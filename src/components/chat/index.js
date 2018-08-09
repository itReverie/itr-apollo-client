
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import MessageElement from '../messageList/';

const GET_MESSAGES = gql`
  query {
    allMessages {
      id,
      text
    }
  }
`;


const MessageList = () => (
    <Query query={GET_MESSAGES}>
      {({ data, loading, subscribeToMore }) => {
        if (!data) {
          return null;
        }
  
        if (loading) {
          return <span>Loading ...</span>;
        }
  
        return (
          <MessageElement
            messages={data.allMessages}
            subscribeToMore={subscribeToMore}
          />
        );
      }}
    </Query>
  );

  export default MessageList;