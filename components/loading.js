import React from 'react';
//@ts-ignore
import Lottie from 'react-lottie';
import animationData from '../images/load.json';

const Loading = () => {
  return (
    <div className='loading_container'>
      <div className='loadingAnimation'>
        <div style={{ width: '200px', height: '200px' }}>
          <Lottie
            options={{
              animationData: animationData,
              loop: true,
              autoplay: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
