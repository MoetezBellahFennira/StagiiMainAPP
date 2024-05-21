import React from 'react';
import ReactPlayer from "react-player"

interface Props {}

const Home = (props: Props) => {

  return (
    <div id="positionvideo">
      <ReactPlayer
        url="https://fb.watch/bjeFh1E4oa/"
      />
    </div>
  )

};
export default Home;