import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

function Loading({ width = '40', height = '40' }) {
  return (
    <ThreeDots
      height={height}
      width={width}
      radius={1}
      color="#ffff"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      visible={true}
    />
  );
}
export default Loading;
