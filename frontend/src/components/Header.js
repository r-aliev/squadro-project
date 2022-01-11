import React from 'react';
import '../App.css';

import logo from "../assets/images/logo.jpg"


function Header() {

 
    return(
        <React.Fragment>
            
            <div className= "header"><img className= "logo" src={logo} alt=""></img><b className='title'>Squadro Game</b></div>
            
        </React.Fragment>
    
    )

}

export default Header;
