import React, { Component } from 'react';
import './App.css';
import Message from '../src/components/message/';
import MessageList from '../src/components/messageList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Chat</h1>
        </header>
        <MessageList />
        <Message />
      </div>
    );
  }
}

export default App;
