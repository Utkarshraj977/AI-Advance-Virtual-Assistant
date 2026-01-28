import React, { createContext, useState } from "react";
import run from "../gemini";


export const DataContext = createContext();


export default function UserContext({ children }) {
  let [speaking, setSpeaking] = useState(false);
  let [rectext, setRectext] = useState("listening....")
  let [aiImg, setAiImg] = useState(false)
  function speak(text) {
    window.speechSynthesis.cancel();

    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-IN";
    window.speechSynthesis.speak(text_speak);
  }


  async function aiResponse(prompt) {

    let text = await run(prompt)
    let newtext = text.split("**") && text.split("*") && text.replace("google", "Utkarsh Raj") &&
      text.replace("Google", "Utkarsh Raj")
    setRectext(newtext)
    speak(newtext)
    setAiImg(true)
    setTimeout(() => {
      setSpeaking(false)
    }, 7000)
  }
  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  let recognition = new speechRecognition()
  recognition.onresult = (e) => {
    let transcript = e.results[0][0].transcript
    speak(transcript)
    setAiImg(true)
    setRectext(transcript)
    takecommand(transcript.toLowerCase())
  }
  function takecommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank")
      speak("openning youtube")
      setAiImg(true)
      setRectext("openning youtube....")
      setTimeout(() => {
        setSpeaking(false)
      }, 7000)
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com", "_blank")
      speak("openning instagram")
      setAiImg(true)
      setRectext("openning instagram....")
      setTimeout(() => {
        setSpeaking(false)
      }, 7000)
    }else if(command.includes("time")){
       let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
       speak(time)
       setRectext(time)
       setTimeout(() => {
        setSpeaking(false)
      }, 7000)
    }else if(command.includes("date")){
      let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
      speak(date)
      setAiImg(true)
      setRectext(date)
      setTimeout(() => {
       setSpeaking(false)
     }, 7000)
   } else if (command.includes("ipl") || command.includes("score")) {
    window.open("https://www.google.com/search?q=ipl&oq=&gs_lcrp=EgZjaHJvbWUqCQgCEEUYOxjCAzIJCAAQRRg7GMIDMgkIARBFGDsYwgMyCQgCEEUYOxjCAzIJCAMQRRg7GMIDMgkIBBBFGDsYwgMyCQgFEEUYOxjCAzIJCAYQRRg7GMIDMgkIBxBFGDsYwgPSAQszNTE4MDM5ajBqN6gCCLACAfEFWVa-MkYS1AY&sourceid=chrome&ie=UTF-8", "_blank")
    speak("ipl score")
    setAiImg(true)
    setRectext("ipl score....")
    setTimeout(() => {
      setSpeaking(false)
    }, 7000)
  }else if (command.includes("sex") || command.includes("kiya hai")) {
    //window.open("https://www.google.com/search?q=ipl&oq=&gs_lcrp=EgZjaHJvbWUqCQgCEEUYOxjCAzIJCAAQRRg7GMIDMgkIARBFGDsYwgMyCQgCEEUYOxjCAzIJCAMQRRg7GMIDMgkIBBBFGDsYwgMyCQgFEEUYOxjCAzIJCAYQRRg7GMIDMgkIBxBFGDsYwgPSAQszNTE4MDM5ajBqN6gCCLACAfEFWVa-MkYS1AY&sourceid=chrome&ie=UTF-8", "_blank")
    speak("haa maine ek baar kiya tha vivek ke sath rat bhr pela tha usko")
    setAiImg(true)
    setRectext("haa maine ek baar kiya tha vivek ke sath rat bhr pela tha usko")
    setTimeout(() => {
      setSpeaking(false)
    }, 7000)
  }else if (command.includes("vivek") || command.includes("kon vivek ke sath kiya tha")) {
    //window.open("https://www.google.com/search?q=ipl&oq=&gs_lcrp=EgZjaHJvbWUqCQgCEEUYOxjCAzIJCAAQRRg7GMIDMgkIARBFGDsYwgMyCQgCEEUYOxjCAzIJCAMQRRg7GMIDMgkIBBBFGDsYwgMyCQgFEEUYOxjCAzIJCAYQRRg7GMIDMgkIBxBFGDsYwgPSAQszNTE4MDM5ajBqN6gCCLACAfEFWVa-MkYS1AY&sourceid=chrome&ie=UTF-8", "_blank")
    speak("vivek jo it section c me pdhta hai techno main salt lake me")
    setAiImg(true)
    setRectext("vivek jo it section c me pdhta hai techno main salt lake me")
    setTimeout(() => {
      setSpeaking(false)
    }, 7000)
  }

    else {
      aiResponse(command)
    }
  }
  const value = {
    recognition, speaking, setSpeaking, rectext, setRectext, aiImg, setAiImg
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

