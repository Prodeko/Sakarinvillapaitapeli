import NanniButton from ".";

const NanniWrapper = ({isWon}: {isWon: boolean}) => {
  const notWonImage = {backgroundImage: 'url("Sakari.png")', backgroundPosition: "bottom"}
  const wonImage = {backgroundImage: 'url("paitasakke.png")', backgroundPosition: "bottom"}

  return (
    isWon ?
    (
    <div className="w-full h-full bg-contain bg-no-repeat row-span-0 row-start-2 row-end-3 md:row-start-1 md:row-end-2 animate-bounce" style={wonImage}>
      <NanniButton style={{position:"absolute", left:"24%", bottom:"16vw"}}/>
      <NanniButton style={{position:"absolute", left:"49%", bottom:"16vw"}}/>
    </div>
    )
    :
    (<div className="w-full h-full bg-contain bg-no-repeat row-span-0 row-start-2 row-end-3 md:row-start-1 md:row-end-2" style={notWonImage}>
      <NanniButton style={{position:"absolute", left:"24%", bottom:"16vw"}}/>
      <NanniButton style={{position:"absolute", left:"49%", bottom:"16vw"}}/>
    </div>
    )
    
  );
};

export default NanniWrapper;
