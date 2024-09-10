import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

const VideoScrollView = () => {
  const videoData = [
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

  const renderVideos = () => {
    return videoData.map((uri, index) => (
      <View key={index} style={styles.videoContainer}>
        <Video
          source={{ uri: uri }}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay={false} // 当前视频可见时播放，其他暂停
          useNativeControls={false} // 显示播放控制
        />
        <Text>{index}</Text>
      </View>
    ));
  };

  return (
    <ScrollView
      scrollEventThrottle={16} // 提高滚动事件响应频率
      contentContainerStyle={styles.scrollView}
    >
      {renderVideos()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  videoContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  video: {
    height: 100,
    width: 100,
  },
});

export default VideoScrollView;
