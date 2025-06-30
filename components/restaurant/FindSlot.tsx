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

  const handleSlotPress = (slot) => {
    let previousSlot = selectedSlot;
    if(previousSlot==slot){
      setSelectedSlot(null)
    }else{
      setSelectedSlot(slot)
    }
  }

  return (
    <View className="flex-1 w-full">
      <View className={`flex ${selectedSlot != null && "flex-row ml-2"} w-full px-2`}>
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
          className = {`${selectedSlot != null && 'flex-1 mt-1 mr-2'}`}
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
          <View
            className = "flex-wrap flex-row mx-2 p-2 bg-[#474747] rounded-lg mr-2"
          >
            {
              slots && (slots?.map((slot,index)=>(
                <TouchableOpacity
                  key={index}
                  className = {`m-2 p-4 bg-[#f49b33] rounded-lg items-center justify-center `}
                  onPress = {()=>handleSlotPress(slot)}
                  disabled = {
                    selectedSlot === slot || selectedSlot === null ? false : true
                  }
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