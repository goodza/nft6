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

var iJSON = {key:0,name:'',foto:'', price:0, param1:''};

class P_Input extends React.Component {
  
/*@ @ @ @ @ @*/

 constructor(){
      super();

      this.fetchData = this.fetchData.bind(this);
      this.toggleBox = this.toggleBox.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.deleteDownside = this.deleteDownside.bind(this);

      this.state = {key:0,name:'',foto:'', price:0, param1:'',
                    
                    shouldShowBox: true };

      this.fetchData();
                }

/*@ @ @ @ @ @*/

  handleSubmit(event) {
    event.preventDefault();
    iJSON = {key:this.state.key, name:this.state.name, foto:this.state.foto, price:this.state.price, param1:this.state.param1};
    console.log('iJSON:');
    console.log(iJSON);
    fetch('/api/models/', 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(iJSON)
    });   
    
  }

  handleChange(e){  
      console.log(e.target.name);
      this.setState({[e.target.name]: e.target.value})
  };
/*@ @ @ @ @ @*/

    componentWillMount(){
      

    }



/*@ @ @ @ @ @*/

  fetchData = () =>{

     fetch('/api/models/').then((response) => {
       return response.json().then((json) => {
          console.log('FETCHING');    
          this.setState({key:json[json.length-1].key+1});
          this.setState({data:json}); 
                                             })
      })

  }

/*@ @ @ @ @ @*/

    toggleBox =()=> {
        
        this.fetchData.bind(this)();
        this.setState({shouldShowBox: !this.state.shouldShowBox});
    };

/*@ @ @ @ @ @*/

    deleteDownside = () => {

     fetch('/api/models/'+(this.state.key-1), 
      {
        method: 'DELETE'
      });  

    }

/*@ @ @ @ @ @*/
    render()
    { 
     
      return( <div>

             <br/>

              {this.state.data.map((object)=>( 
                      <Motion style={{x: spring(this.state.shouldShowBox ? 0 : 300), op:spring(this.state.shouldShowBox ? 0 : 1)}}>
                            {({x}) =>
                                <img className={styles.productGallery} src={object.foto} style={{
                                  WebkitTransform: `translate3d(${x}px, 0, 0)`,
                                  transform: `translate3d(${x}px, 0, 0)`
                                }} />
                            }
                     </Motion>     
              ))}   

              <br/>
                      
              <br/>     
              <br/>
                  <div style={{float:`right`}}>
                      <Motion style={{x: spring(this.state.shouldShowBox ? 0 : 500)}}>
                            {({x}) =>
                            
                              <div className={styles.box}>
                                <div className={styles.boxActive} style={{
                                  WebkitTransform: `translate3d(${x}px, 0, 0)`,
                                  transform: `translate3d(${x}px, 0, 0)`,
                                }} />
                              </div>
                            }
                     </Motion>         
                  </div>
                  
                  <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    
                     <input placeholder='key' name='key' value={this.state.key}  className={styles.textarea0}/> 
                     <input placeholder='name' name='name' className={styles.textarea0}/> 
                     <input placeholder='foto' name='foto' className={styles.textarea0}/> 
                     <input placeholder='price' name='price' value={this.state.price} className={styles.textarea0}/> 
                     <input placeholder='param1' name='param1' className={styles.textarea0}/> 

                     <button type='submit' onClick={this.toggleBox}>toggle</button>
                     
                     
                     <br/>
                     <label style={{marginLeft:`20px`}}>KEY:{this.state.key}</label> <br/>
                     <label style={{marginLeft:`20px`}}>NAME:{this.state.name}</label> <br/>
                     <label style={{marginLeft:`20px`}}>FOTO:{this.state.foto}</label> <br/>
                     <label style={{marginLeft:`20px`}}>PRICE:{this.state.price}</label> <br/>
                     <label style={{marginLeft:`20px`}}>PARAM1:{this.state.param1}</label> <br/>

                  </form>                

                    <button onClick={this.fetchData}>fetch</button>
                    <button onClick={this.deleteDownside}>delete</button>

                  <div style={{color:`darkblue`}}> 
                     <input placeholder='key' name='key' value={this.state.key}  className={styles.textarea0}/> 
                     <input placeholder='name' name='name' className={styles.textarea0}/> 
                     <input placeholder='foto' name='foto' className={styles.textarea0}/> 
                     <input placeholder='price' name='price' className={styles.textarea0}/> 
                     <input placeholder='param1' name='param1' className={styles.textarea0}/> 
                  </div>
                   
             <br/> 
            
                 <div style={{float:`left`,marginRight:`200px`}}> {this.state.data.map((object)=>(<ul> {object.price} </ul>))} </div> 
                 {this.state.data.map((object)=>(<ul style={{}}> {object.param1} </ul>))} <br/>

              </div>
            )  
    }

/*@ @ @ @ @ @*/

}

export default P_Input


 /*     curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"key":"3","name":"4","foto":"xx","price":"12","param1":"dd"}'  http://localhost:3333/api/models/*/
 /*     curl -v -H "Content-type: application/json" -X POST -d '{"key":"3","name":"Baxi SLIM 1.300 iN","foto":"https://mdata.yandex.net/i?path=b0526223915_img_id4716976515662803319.jpeg&size=5","price":"46640","param1":"КПД 90 %"}'  http://localhost:3333/api/models/    */ 