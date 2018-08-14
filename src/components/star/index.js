import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './star.css';
import starActive from '../../images/starActive.svg';
import starInactive from '../../images/starInactive.svg';

export default class Star extends Component{

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick = () => {
        this.props.onClick(!this.props.active);
    }

    render(){
        const {active}=this.props;
        const srcImage=active?starActive:starInactive;
        
        return (<img src={srcImage} 
                     className="favorite-icon"
                     alt="Add to favorites" 
                     onClick={this.onClick}/>
                );
  }
}

Star.propTypes={
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired
}

Star.defaultProps = {
   active: false
 }

