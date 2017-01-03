/*4276 4000 1595 3897*/
import styles from './App.css';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import 'whatwg-fetch';

/*@ @ @ @ @ @ @ @ @ @ @*/


class P_Input extends React.Component {
  
/*@ @ @ @ @ @*/

    constructor(){
      super();
        
                }

/*@ @ @ @ @ @*/

    componentDidMount(){

      fetch('/api/models').then((response) => {
       return response.json().then((json) => {

          this.setState({data:json})
            
              })

      })

    }

/*@ @ @ @ @ @*/

    render()
    { 

      const data = this.state.data;
    
      return( <div>

             {data.map((object)=>(object.price))} <br/>
             {data.map((object)=>(object.param1))} <br/>
             {data.map((object)=>(<img className={styles.imgGallery} src={object.foto} />))} <br/>
              
              </div>
            )  
    }

/*@ @ @ @ @ @*/

}



export default P_Input