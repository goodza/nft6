/*4276 4000 1595 3897*/
import styles from './App.css';

import React from 'react';
/*import ReactCSSTransitionGroup from 'react-addons-css-transition-group';*/
/*import ReactTransitionGroup from 'react-transition-group';*/
import {render, findDOMNode} from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import {Motion, spring} from 'react-motion';
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

       

             <br/>

              {data.map((object)=>( 
                      <Motion style={{x: spring(this.state.shouldShowBox ? 500 : 0)}}>
                            {({x}) =>
                                <img className={styles.productGallery} src={object.foto} style={{
                                  WebkitTransform: `translate3d(${x}px, 0, 0)`,
                                  transform: `translate3d(${x}px, 0, 0)`,
                                }} />
                            }
                     </Motion>     
              ))}   

              <br/>

              <button className="toggle-btn"
                onClick={this.toggleBox}>
                   toggle
              </button>
                      
              <br/>     
              <br/>

                      <Motion style={{x: spring(this.state.shouldShowBox ? 500 : 0)}}>
                            {({x}) =>
                            
                              <div className={styles.box}>
                                <div className={styles.boxActive} style={{
                                  WebkitTransform: `translate3d(${x}px, 0, 0)`,
                                  transform: `translate3d(${x}px, 0, 0)`,
                                }} />
                              </div>
                            }
                     </Motion>         
             
             <br/> 
            
                 <div style={{float:`left`,marginRight:`200px`}}> {data.map((object)=>(<ul> {object.price} </ul>))} </div> 
                 {data.map((object)=>(<ul style={{}}> {object.param1} </ul>))} <br/>

              </div>
            )  
    }

/*@ @ @ @ @ @*/

}

export default P_Input