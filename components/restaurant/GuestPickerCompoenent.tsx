import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const GuestPickerCompoenent = ({selectedNumber,setSelectedNumber}) => {

    

    const decrement = () => {
      if(selectedNumber > 1) setSelectedNumber(selectedNumber - 1)
    }

    const increment = () => {
      if(selectedNumber < 12) setSelectedNumber(selectedNumber + 1)
    }

  return (
    <View
        className = "flex flex-row items-center rounded-lg text-white text-base"
    >
      <TouchableOpacity
        onPress = {decrement}
        className = "rounded"
      >
        <Text
            className = "text-white text-lg border border-[#f49b33] mr-1 rounded-l-lg px-3"
            onPress = {decrement}
        >-</Text>
      </TouchableOpacity>
      <Text className = "px-3 text-white bg-[#474747] text-lg border border-[#474747]">
        {selectedNumber}
      </Text>
      <TouchableOpacity
        onPress = {decrement}
        className = "rounded"
      >
        <Text
            className = "ml-1 text-white text-lg border border-[#f49b33] rounded-r-lg px-3"
            onPress = {increment}
        >+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GuestPickerCompoenent