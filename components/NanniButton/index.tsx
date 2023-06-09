'use client'
import { FunctionComponent } from "react";

 const NanniButton = () => {
  // TODO: Proper quotes
  const quotes = ["raineri", "kuvaa tulee"]
  
  const onClick = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    // TODO: UI for this
    window.alert(randomQuote)
  }
  // TODO: Fix bg color
  return (
    <div onClick={onClick} className="w-5 h-5 bg-white"/>
  );
}
 
export default NanniButton;