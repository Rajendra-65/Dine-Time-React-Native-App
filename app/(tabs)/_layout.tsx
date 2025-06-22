import { Tabs } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Tabs
        screenOptions={{headerShown:false}}
    >
        <Tabs.Screen name = "home" options = {{ title : "home" }}/>
        <Tabs.Screen name = "history" options = {{title : "history"}}/>
        <Tabs.Screen name = "profile" options = {{title : "profile"}}/>
    </Tabs>
  )
}