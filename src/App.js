import React, { Component } from 'react';
import './App.css';
import Message from '../src/components/message/';
import MessageContainer from '../src/components/messagesContainer';

export default class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h1>Messages</h1>
          <h3>Subscriptions with GraphQL</h3>
        </header>
        <Message />
        <MessageContainer />
      </div>
    );
  }
}

