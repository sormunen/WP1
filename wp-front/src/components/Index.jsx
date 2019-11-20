import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import { deleteAllTopics, updateTopics } from '../service/apiclient';
import {merge, tada, bounce, slideInDown, slideInRight, rotateInDownLeft, swing } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
const tadaBounce = merge(tada, bounce);
const rotateSlideRight = merge(rotateInDownLeft, slideInRight, swing);
const styles = {
    bounce: {
      animation: 'infinite 2s',
      animationName: Radium.keyframes(tadaBounce, 'bounce')
    }
  }
  const styles2 = {
    bounce: {
      animation: ' 4s',
      animationName: Radium.keyframes(rotateSlideRight, 'bounce')
    }
  }
  
export default function Index() {
    const [message, setMessage] = useState('')
    const clearServerDb = () => {
        deleteAllTopics().then(()=>
        setMessage("Quotes emptied"))
    }
    const resetServerDb = () => {
        updateTopics().then(()=>
        setMessage("Quotes reset"))
    }
    return (
        <div className="Index">
            <div className="homeinfo">
            <h1>Home Page!</h1>
            <p>Below you can see some awesome animations</p>
           </div>
            <StyleRoot>
      <div className="legoman" style={styles.bounce}>
         <img src="https://vignette.wikia.nocookie.net/lego-dimensions-customs/images/7/76/Bob.png/revision/latest?cb=20161204113936" alt=""/> 
      </div>
    </StyleRoot>
    <StyleRoot>
      <div className="test" style={styles2.bounce}>
         <img src="https://i.imgur.com/ytLW8bT.png" alt=""/> 
      </div>
    </StyleRoot>
            
            <p className="message">{message}</p>
        </div>
    )
}
