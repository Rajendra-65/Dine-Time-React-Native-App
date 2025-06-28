import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const FindSlot = ({ date,
  selectedNumber,
  slots,
  selectedSlot,
  setSelectedSlot }) => {

  const [slotsVisible, setSlotVisisble] = useState(false);

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
          <TouchableOpacity
            className="w-full"
            onPress={handlePress}
          >
            <Text className="text-lg text-white text-center font-semibold bg-[#f49b33] p-2 my-3 rounded-lg">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default FindSlot;