import Ionicons from "@expo/vector-icons/Ionicons"
import { Tabs } from 'expo-router'
import React from 'react'
import { Colors, primary } from "../../assets/colors"


export default function _layout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarInactiveTintColor: Colors.dark.text,
                tabBarStyle: {
                    backgroundColor: Colors.SECONDARY,
                    paddingBottom: 14,
                    height: 75
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "bold"
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "home",
                    tabBarIcon: () => (
                        <Ionicons
                            name="home"
                            size={24}
                            color={primary}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name="history"
                options={{
                    title: "history",
                    tabBarIcon: () => (
                        <Ionicons
                            name="time"
                            size={24}
                            color={primary}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title: "profile",
                    tabBarIcon: () => (
                        <Ionicons
                            name="person-sharp"
                            size={24}
                            color={primary}
                        />
                    )
                }} 
            />
        </Tabs>
    )
}