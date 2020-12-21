import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Animated } from "react-native"
import { WebView } from 'react-native-webview';

const duration = 500 // animation ms
export default ({ video, clearVideoId }: any) => {
  const fadeAnim = new Animated.Value(0);

  const fadeIn = () => {
    fadeAnim.setValue(0)
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true
    }).start();
  };

  const fadeOut = () => {
    fadeAnim.setValue(1)
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    fadeIn()
  }, [video])

  return <Animated.View style={[
    styles.webViewContainer,
    {
      opacity: fadeAnim // Bind opacity to animated value
    }]}>
    <View style={styles.title}>
      <Text style={[styles.closeText, styles.titleText]} numberOfLines={1} ellipsizeMode='tail'>{video.title}</Text>
      <Text style={styles.closeText} onPress={() => {
        fadeOut()
        setTimeout(() => {
          clearVideoId()
        }, duration)
      }}>Close</Text>
    </View>
    <WebView
      style={styles.webView}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      source={{ uri: 'https://www.youtube.com/embed/' + video.videoId }}
    />
  </Animated.View>
}

const styles = StyleSheet.create({
  webViewContainer: {
    // backgroundColor: '#000',
    flex: 1,
    margin: -10
  },
  webView: {
    backgroundColor: '#000'
  },
  title: {
    backgroundColor: '#5176D2',
    padding: 10,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  closeText: {
    color: "#fff",
  },
  titleText: {
    flex: 0.8
  }
})