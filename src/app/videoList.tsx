import React from 'react';
import { Video } from 'expo-av';
import { ScrollView } from '@/ui';

const urlList = [
  'https://appbet222.com/file/mujun-certificate/202409/71132d72db1b4ae6817916018d581994.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/4e938b13ce56414e971571e57d8bdac9.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/d7bf2e64512c4d93b84416ab2ab1e650.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/e790e9809d2c4d83b82fdd0e6e66bfa2.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/d61e88ef1b8e4a898de637109e8d51af.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/de8e30dfae584be283e9937ad0a90502.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/c187f2597071440da29ada91607a5a22.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/25b604d23f7f4418a333be3c9d1daf60.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/6f8ee9c18fcf4fd99cd83629a31b4bff.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/c9b3cb0ebdb54f21b3c08dc9325e8d3e.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/164739c460234f7a8e60e153d475b7aa.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/140357861ce5459099fb7faf7c84bbc0.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/71132d72db1b4ae6817916018d581994.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/4e938b13ce56414e971571e57d8bdac9.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/d7bf2e64512c4d93b84416ab2ab1e650.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/e790e9809d2c4d83b82fdd0e6e66bfa2.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/d61e88ef1b8e4a898de637109e8d51af.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/de8e30dfae584be283e9937ad0a90502.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/c187f2597071440da29ada91607a5a22.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/25b604d23f7f4418a333be3c9d1daf60.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/6f8ee9c18fcf4fd99cd83629a31b4bff.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/c9b3cb0ebdb54f21b3c08dc9325e8d3e.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/164739c460234f7a8e60e153d475b7aa.mp4',
  'https://appbet222.com/file/mujun-certificate/202409/140357861ce5459099fb7faf7c84bbc0.mp4',
];

export default function VideoList() {
  const list = urlList.map((url, i) => {
    return (
      <Video
        key={i}
        source={{ uri: url }}
        isLooping={false}
        style={{
          width: 40,
          height: 40,
          marginLeft: 50,
        }}
        shouldPlay={true}
        useNativeControls={false}
        isMuted={true}
      />
    );
  });

  return <ScrollView>{list}</ScrollView>;
}
