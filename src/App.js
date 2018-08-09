import React, { Component } from 'react';
import './App.css';
import Message from '../src/components/message/';
import Chat from '../src/components/chat/';

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h1>Chat</h1>
          <h3>Subscriptions with GraphQL</h3>
        </header>
        
        <Message />
        <Chat />
       
       
      </div>
    );
  }
}

export default App;
