import React, {Component} from 'react';

export default class Message extends Component{

    constructor(props){
        super(props);
        this.onSend=this.onSend.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state={message:''};
    }

    onSend=()=>{
        console.log('send:', this.state.message);
    }

    onTextChange=(event)=>{
        this.setState({message:event.target.value});
    }

    handleKeyPress=(event)=>{
        if (event.key === 'Enter') {
            this.onSend();
        }
    }

    render(){
        return(<div>
            <input type="text" 
                   onChange={this.onTextChange}
                   onKeyPress={this.handleKeyPress}/>
            <button onClick={this.onSend}>Send</button>
        </div>);
    }
}