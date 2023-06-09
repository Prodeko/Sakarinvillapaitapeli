'use client'
import { FunctionComponent } from "react";

 const NanniButton = (props: any) => {
  // TODO: Proper quotes
  const quotes = ["raineri", "kuvaa tulee", 
'"Doge ftw — Elon Musk" — Sakari',
'"Ok, but it will cost 3 Doge — Elon Musk" — Sakari',
'"Dojo 4 Doge — Elon Musk" — Sakari',
'"Do you want Tesla to accept Doge? — Elon Musk" — Sakari',
'"No highs, no lows, only Doge — Elon Musk" — Sakari',
'"Tesla merch buyable with Dogecoin — Elon Musk" — Sakari',
'"I will keep supporting Dogecoin — Elon Musk" — Sakari',
'"I will pay a million Dogecoin for proof of this mine’s existence! — Elon Musk" — Sakari',
'"And you can pay with Doge! — Elon Musk" — Sakari',
'"But u have to pay in Doge — Elon Musk" — Sakari']
  
  const onClick = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    // TODO: UI for this
    window.alert(randomQuote)
  }
  // TODO: Fix bg color
  return (
    <input type="button" onClick={onClick} value="?" style={props.style}/>
  );
}
 
export default NanniButton;