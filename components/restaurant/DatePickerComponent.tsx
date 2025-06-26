import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function DatePickerComponent() {
  
  const [show,setShow] = useState(false);
  const [date,setDate] = useState(new Date());

  const handlePress = () => {
    setShow(true)
  }

  return (
    <View
        className = "flex flex-row"
    >
      <TouchableOpacity
        onPress = {handlePress}
      >
        <DateTimePicker 
            accentColor = "#f49b33"
            textColor = "#f49b33"
            value = {date}
            mode = "date"
            display = "default"
            minimumDate = {new Date()}
            maximumDate = {new Date(new Date().setDate(new Date().getDate()+7))}
        />
      </TouchableOpacity>
    </View>
  )
}