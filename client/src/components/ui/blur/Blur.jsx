import React from 'react';

const Blur = ({ top, left, bgColor }) => {
  return (
    <div
      className={`w-[50%] h-[80%] absolute ${top} ${left} blur-[100px] ${bgColor} z-[-1]`}
    ></div>
  );
};

export default Blur;
