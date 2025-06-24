import { BlurView } from "expo-blur"
import React from 'react'
import { Image, ImageBackground, Platform, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import homeBanner from '../../assets/images/homeBanner.png'
import logo from '../../assets/images/logo.png'
export default function home() {
  return (
    <SafeAreaView
      style = {{backgroundColor:'#2b2b2b'}}
    >
      <View
        className = "flex items-center justify-center"
      >
        <View
          className = "bg-[#f5f5f5] w-11/12 rounded-lg shadow-lg justify-between items-center"
        >
          <View
            className = "flex flex-row"
          >
            <Text 
              className ={`text-base h-10 pt-[${Platform.OS === 'ios' ? 8 : 6.5}] align-middle text-[#2b2b2b] mt-2`}
            >
              {" "}Welcome to {" "}
            </Text>
            <Image 
              resizeMode = "cover"
              className = "w-20 h-12 mt-1"
              source={logo}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <ImageBackground
          resizeMode='cover'
          className = "my-4 w-full h-52 items-center justify-center"
          source = {homeBanner}
        >
          <BlurView
            intensity = {Platform.OS === 'android' ? 100 : 40 }
            tint = "dark"
            className = "w-full p-4 shadow-lg"
          >
            <Text 
              className = "text-center text-3xl font-bold text-white"
            >
              Dine With Your Loved Ones  
            </Text>
          </BlurView>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
}