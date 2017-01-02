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
/*       this.state = {

       data:[
                {key:1,
                  name:'Baxi MAIN 5 14 F',
                  foto:'https://mdata.yandex.net/i?path=b0531122804_img_id8136776382544069809.jpeg',
                  price: 0,
                  param1: 'КПД 90.7 %'},
                {key:2,
                  name:'Buderus Logamax U072-12K',
                  foto:'https://mdata.yandex.net/i?path=b0608225049_img_id1568430545320165326.jpeg',  
                  price: 0,
                  param1: 'КПД 92 %'}
              ]
                   };*/
        
                }

/*@ @ @ @ @ @*/

    componentDidMount(){

      fetch('/api/models').then((response) => {
       return response.json().then((json) => {

          this.setState({data:json})

             const images = json.photos.photo.map(({farm, server, id, secret}) => { 
                 return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
             });

            
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