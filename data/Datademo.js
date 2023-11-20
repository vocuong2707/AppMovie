import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import buildFrame from './buildFrame'
let dataUrl = 'https://api.themoviedb.org/3/movie/297762?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos'
export default function App() {
  
  useEffect(()=>{
    fechData();
 },[])
 
 const fechData = async () => {
     try {
         const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US');
         const json = await response.json();
         console.log(json);
         setData(json.results);
         console.log(json.results);
     }catch(error) {
         console.error(error);
     }finally {
         
     }};

    return (
      
         <View></View>
    );
}