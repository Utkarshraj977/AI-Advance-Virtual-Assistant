import './App.css'
import React, { useContext, useState } from 'react'
import va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { DataContext } from './context/UserContext';
import speakimg from './assets/speak.gif'
import aivoice from './assets/aivoice.gif'


function App() {
  let { recognition,speaking,setSpeaking,rectext,setRectext,aiImg,setAiImg } = useContext(DataContext)

  return (

    <div className='main'>
      <img src={va} alt="" id='shilpa'></img>
      <span>I`m shilpa, your Advanced virtual Assistant</span>
      {!speaking ?
      <button onClick={() =>{ 
       setRectext("listening....")
       setSpeaking(true)
       setAiImg(false)
       recognition.start()
      }}>click here <CiMicrophoneOn /></button>
       : <div className='response'>
            {!aiImg ? <img src={speakimg} alt="" id='speakimg'></img> 
            : <img src={aivoice} alt="" id='aivoice'></img>}
            
            <p>{rectext}</p>
          </div>}
    </div>
  )
}

export default App
