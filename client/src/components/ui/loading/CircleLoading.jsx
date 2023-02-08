import React from 'react';

const CircleLoading = ({ height }) => {
  return (
    <div
      className={`w-full ${height ?? 'h-screen'
        } flex items-center justify-center`}
    >
      <div
        className={`w-[300px] h-[300px] relative rounded-full after:content-['Loading...'] after:content-center  after:absolute-x-center after:top-[50%] after:translate-y-[-50%] after:animate-pulse`}
      >
        <div className="w-full animate-loading-1 h-full absolute rounded-full border-[10px] border-r-red-200 border-solid border-l-transparent border-t-transparent border-b-transparent"></div>
        <div className="w-full h-full animate-loading-2 absolute rounded-full border-[10px] border-l-blue-200 border-solid border-r-transparent border-t-transparent border-b-transparent"></div>
        <div className="w-full h-full animate-loading-3 absolute rounded-full border-[10px] border-t-green-200 border-solid border-l-transparent border-r-transparent border-b-transparent"></div>
      </div>
    </div>
  );
};

export default CircleLoading;
