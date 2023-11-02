

import React from 'react'
import styled from 'styled-components'

const Adss = () => {
  return (
    <Wrapper>

    <div className='video-one'>
      <video src="/images/vn.mp4"  muted autoPlay loop  />
    </div>
    </Wrapper>
  )
}
const Wrapper =styled.section`

.video-one video{

  width:94%;
  height:411px;

  
}

.video-one{

  background:#efefef;
  overflow:hidden;
}

@media screen and (max-width: 600px) {
  .video-one video{

    width: 100%;
    height: 298px;


}

}
`

export default Adss
