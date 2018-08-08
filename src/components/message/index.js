import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Message extends Component{

    constructor(props){
        super(props);
        this.onSend=this.onSend.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state={message:''};
    }

    onSend=()=>{
        //we need to call the mutation creation
        console.log('send:', this.state.message);
        this.props.mutate({
            variables: { text: this.state.message }
          })
            .then(({ data }) => {
              console.log('got data', data);
            }).catch((error) => {
              console.log('there was an error sending the query', error);
            });
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

const cerateMessage = gql`
 mutation createMessage($text: String!){
  	createMessage(text:$text){
    		id,
    		text	
  }    	
}
`;

const NewEntryWithData = graphql(cerateMessage)(Message);

export default NewEntryWithData;