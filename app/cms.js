/*4276 4000 1595 3897*/
import styles from './App.css';

import React from 'react';
/*import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTransitionGroup from 'react-transition-group';*/
import {render, findDOMNode} from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import 'whatwg-fetch';
/*import TweenMax from 'gsap';*/

/*@ @ @ @ @ @ @ @ @ @ @*/




/*@ @ @ @ @ @ @ @ @ @ @*/

class P_Input extends React.Component {
  
/*@ @ @ @ @ @*/

    constructor(){
      super();
      this.state = { shouldShowBox: true };
                }

/*@ @ @ @ @ @*/


/*@ @ @ @ @ @*/

    componentDidMount(){
      

      fetch('/api/models').then((response) => {
       return response.json().then((json) => {
         
          this.setState({data:json})
            
              })

      })

    }

/*@ @ @ @ @ @*/

    toggleBox = () => {
        
        this.setState({
          shouldShowBox: !this.state.shouldShowBox});

    };

/*@ @ @ @ @ @*/
    render()
    { 

      const data = this.state.data;
   
      return( <div>

             {data.map((object)=>(object.price))} <br/>
             {data.map((object)=>(object.param1))}              <br/>
                        

             <br/>


              {data.map((object)=>(<img className={styles.productGallery} src={object.foto} />))} 

              <br/>

              <button className="toggle-btn"
                onClick={this.toggleBox}>
                   toggle
              </button>
                      
              <br/>     
              <br/>
  
              <div className={this.state.shouldShowBox ? styles.boxActive : styles.box}/>

              </div>
            )  
    }

/*@ @ @ @ @ @*/

}

export default P_Input