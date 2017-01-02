import React from 'react';
import styles from './App.css';
import {render} from 'react-dom';

import P_Input from './cms.js';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
     <div> 
      <P_Input />
     </div> 
    );
  }
}
