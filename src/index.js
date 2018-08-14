import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
});
  
const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true,
    },
});
  
const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return (
        kind === 'OperationDefinition' && operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
);
  
const link = ApolloLink.from([terminatingLink]);
  
const cache = new InMemoryCache();
  
const client = new ApolloClient({
    link,
    cache,
});


ReactDOM.render(<ApolloProvider client={client}>
                    <App />
                </ApolloProvider>,
                document.getElementById('root'));

registerServiceWorker();
