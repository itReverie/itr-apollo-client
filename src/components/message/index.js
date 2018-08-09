import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import send from '../../images/send.svg';
import './message.css';

class Message extends Component{

    constructor(props){
        super(props);
        this.onSend=this.onSend.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state={message:''};
    }

     //onSend=()=>this.props.createMessage(this.state.message);

    onSend=()=>{
        //we need to call the mutation creation
        //console.log('send:', this.state.message);

        this.props.mutate({
            variables: { text: this.state.message }
          })
            .then(({ data }) => {
              console.log('got data', data);
            }).catch((error) => {
              console.log('there was an error sending the query', error);
        });

        //clean the text input
        this.setState({message:""});

    }

    onTextChange=(event)=>{
        this.setState({message:event.target.value});
    }

    handleKeyPress=(event)=>{
        if (event.key === 'Enter' && this.state.message.trim() !="" ) {
            this.onSend();
        }
    }

    render(){
        return(<div className="message-text-container">
            <input type="text"
                   value={this.state.message}
                   className="message-text-input"
                   onChange={this.onTextChange}
                   onKeyPress={this.handleKeyPress}/>
            <img className="send-button"
                 src={send} 
                 onClick={this.onSend} />
        </div>);
    }
}

const createMessage = gql`
 mutation createMessage($text: String!){
  	createMessage(text:$text){
    		id,
    		text	
  }    	
}
`;

// const NewEntryWithData = graphql(createMessage, {
//     props: ({ mutate }) => ({
//         createMessage: (text) => mutate({ variables: { text } }),
//       }),
// })(Message);

const NewEntryWithData = graphql(createMessage)(Message);


export default NewEntryWithData;