import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const FindSlot = ({ date,
  selectedNumber,
  slots,
  selectedSlot,
  setSelectedSlot }) => {

  const [slotsVisible, setSlotVisisble] = useState(true);

  const handlePress = () => {
    setSlotVisisble(!slotsVisible)
  }

  return (
    <View className="flex-1 w-full">
      <View className={`flex ${selectedSlot != null && "flex-row ml-5"} w-full px-2`}>
        <View
          className = {`${selectedSlot != null && 'flex-1'}`}
        >
          <TouchableOpacity
            className="w-full"
            onPress={handlePress}
          >
            <Text className="text-lg text-center font-semibold bg-[#f49b33] p-2 my-3 rounded-lg">
              Find Slots
            </Text>
          </TouchableOpacity>
        </View>
        <View
          className = {`${selectedSlot != null && 'flex-1'}`}
        >
          {
            selectedSlot != null && (
              <View className = "flex-1">
                <TouchableOpacity onPress = {handlePress}>
                  <Text 
                    className = "text-center text-white text-lg font-semibold bg-[#f49b33] p-2 my-2 mx-2 rounded-lg"
                  >
                    BookSlot
                  </Text>
                </TouchableOpacity>
              </View>
            )
          }
        </View>
      </View>
      {
        slotsVisible &&(
          <View>
            {
              slots && (slots?.map((slot,index)=>(
                <TouchableOpacity
                  key={index}
                >
                  <Text className = "text-white font-bold">
                    {slot}
                  </Text>
                </TouchableOpacity>
              )))
            }
          </View>
        )
      }
    </View>
  )
}

export default FindSlot;