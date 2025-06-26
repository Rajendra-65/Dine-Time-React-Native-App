import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

export default function DatePickerComponent({date,setDate}) {
    const [show, setShow] = useState(false);
    

    const onChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShow(false);  // hide picker after selection on Android
        }
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handlePress = () => {
        setShow(true);
    };

    return (
        <View className="flex p-2 flex-row items-center">
            {Platform.OS === 'android' && (
                <>
                    <TouchableOpacity
                     onPress={handlePress}
                     className = {`flex flex-row w-full justify-end rounded-lg text-white text-base ${Platform.OS === "android" && "px-2 py-1 justify-center bg-[#474747"}`}
                    >
                        <Text className="text-[#f49b33] font-medium bg-[#474747] p-2 border-[#474747] rounded-lg absolute left-7 ">{date ? date.toLocaleDateString() : ""}</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            minimumDate={new Date()}
                            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                            onChange={onChange}
                        />
                    )}
                </>
            )}

            {Platform.OS === 'ios' && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    minimumDate={new Date()}
                    maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                    onChange={onChange}
                />
            )}
        </View>
    );
}
