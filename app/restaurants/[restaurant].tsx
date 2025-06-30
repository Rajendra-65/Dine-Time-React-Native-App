import DatePickerComponent from '@/components/restaurant/DatePickerComponent'
import FindSlot from '@/components/restaurant/FindSlot'
import GuestPickerCompoenent from '@/components/restaurant/GuestPickerCompoenent'
import { db } from '@/config/firebaseConfig'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useLocalSearchParams } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, Linking, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Restaurant = () => {
  const { restaurant } = useLocalSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0)
  const [restaurantData, setRestaurantData] = useState({});
  const [carouselData, setCarouselData] = useState({});
  const [selectedNumber, setSelectedNumber] = useState(2)
  const [slotData, setSlotData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null)
  const FlastListRef = useRef(null)
  const windowWidth = Dimensions.get("window").width

  const handleNextImage = () => {
    const carouselImagelength = carouselData[0]?.images.length

    if (currentIndex < carouselImagelength - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      FlastListRef.current.scrollToIndex({ index: nextIndex, Animated: true })
    }
    if (currentIndex == carouselImagelength - 1) {
      const nextIndex = 0;
      setCurrentIndex(nextIndex);
      FlastListRef.current.scrollToIndex({ index: nextIndex, Animated: true })
    }
  }

  const handlePrevImage = () => {
    const carouselImagelength = carouselData[0]?.images.length

    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      FlastListRef.current.scrollToIndex({ index: prevIndex, Animated: true })
    }

    if (currentIndex == 0) {
      const prevIndex = carouselImagelength - 1
      setCurrentIndex(prevIndex)
      FlastListRef.current.scrollToIndex({ index: prevIndex, Animated: true })
    }
  }

  const handleLocation = async () => {
    const url = "https://www.google.com/maps/place/CARE+Hospitals,+Bhubaneswar/@20.3216241,85.8043599,15z/data=!4m6!3m5!1s0x3a190909f29f075d:0xd3b1c0dc055f67c4!8m2!3d20.3216241!4d85.8131158!16s%2Fg%2F1tdd87ww?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D"

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url)
    } else {
      console.log("Don't support the URL")
    }
  }

  const carouselItem = ({ item }) => {
    return (
      <View
        style={{ width: windowWidth - 2 }}
        className="h-64 relative rounded-[25px]"
      >
        <View
          style={{
            position: 'absolute',
            top: "50%",
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            right: "6%"
          }}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color="white"
            onPress={handleNextImage}
          />
        </View><Text>{" "}</Text>
        <View
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            left: "50%",
            transform: [{ translateX: -50 }],
            zIndex: 10,
            bottom: 15
          }}
        >
          {
            carouselData[0].images?.map((_, i) => (
              <View
                key={i}
                className={`bg-white h-2 w-2 ${i == currentIndex && "h-3 w-3"} p-1 mx-1 rounded-full`}
              />
            ))
          }
        </View>
        <View
          style={{
            position: 'absolute',
            top: '50%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            left: '6%'
          }}
        >
          <Ionicons
            onPress={handlePrevImage}
            name='arrow-back'
            size={24}
            color="white"
          />
        </View>
        <View>
          <Image
            source={{ uri: item }}
            style={{
              opacity: 0.5,
              backgroundColor: "black",
              marginRight: 20,
              marginLeft: 5
            }}
            className="h-64"
          />
        </View>
      </View>
    )
  }

  useEffect(() => {
    if (restaurant) {
      getRestaurantData();
    }
  }, [restaurant]);

  const getRestaurantData = async () => {
    try {
      const restaurantQuery = query(
        collection(db, 'restaurants'),
        where("name", "==", restaurant)
      );
      const restaurantSnapShot = await getDocs(restaurantQuery);

      if (restaurantSnapShot.empty) {
        console.log("No matching restaurant found");
        return;
      }

      for (const doc of restaurantSnapShot.docs) {
        const restaurantData = doc.data();
        setRestaurantData(restaurantData);

        const carouselQuery = query(
          collection(db, 'carousel'),
          where("res_id", "==", doc.ref) // or doc.ref if res_id is a reference
        );
        const carouselSnapShot = await getDocs(carouselQuery);

        const carouselImages = carouselSnapShot.docs.map(c => c.data());
        setCarouselData(carouselImages);

        const slotsQuery = query(
          collection(db, 'slots'),
          where("ref_id", "==", doc.ref) // or doc.ref
        );
        const slotsSnapShot = await getDocs(slotsQuery);
        
        const slots = slotsSnapShot.docs.map(s => s.data());
        if (slots.length > 0 && slots[0]?.slot) {
          setSlotData(slots[0].slot);
        } else {
          
          setSlotData([]); // or null depending on your default state
        }
      }

    } catch (e) {
      console.log("error in fetching Data", e);
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: '#2b2b2b', flex: 1, paddingBottom: 20, height: 20 }}
    >
      <ScrollView
        className="h-full"
      >
        <View
          className="flex-1 py-2 p-2"
        >
          <Text
            className="text-[#fb9b33]"
          >
            {restaurant}
          </Text>
          <View
            className="border-b border-[#fb9b33]"
          />

        </View>
        <View
          className="h-54 max-w-[98%] mx-2 rounded-[25px]"
        >
          <FlatList
            ref={FlastListRef}
            data={carouselData[0]?.images}
            renderItem={carouselItem}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={{ borderRadius: 25 }}
          />
        </View>
        <View
          className="flex-1 flex-row mt-2 p-2"
        >
          <Ionicons
            onPress={handleLocation}
            name="location-sharp"
            size={24}
            color="#f49b33"
          />
          <Text
            className="max-w-[75%] text-white"
          >
            {restaurantData?.address} | {"   "}
            <Text
              onPress={handleLocation}
              className="flex items-center mt-1 underline text-[#f49b33] font-bold italic"
            >
              Get Direction
            </Text>
          </Text>
        </View>
        <View
          className="flex-1 flex-row ml-1 p-2"
        >
          <Ionicons
            onPress={handleNextImage}
            name="time"
            size={20}
            color='#f49b33'
          />
          <Text
            className="max-w-[75%] mx-1 font-semibold text-white"
          >
            {restaurantData?.opening} - {restaurantData?.closing}
          </Text>
        </View>
        <View className="flex-1 border m-2 p-2 border-[#f49b33] rounded-lg">
          <View className="flex flex-row items-center p-2">
            <Ionicons
              name="calendar"
              size={20}
              color="#f49b33"
            />
            <Text className="text-white mx-2">
              Select a booking Date
            </Text>
            <DatePickerComponent
              date={date}
              setDate={setDate}
            />
          </View>
          <View className="flex flex-row bg-[#474747] p-2 items-center mt-6 border-[#474747] rounded-md">
            <Ionicons
              name="people"
              size={20}
              color="#f49b33"
            />
            <Text className="text-white mx-2">
              Select Number of guest
            </Text>
            <View
              className="mr-1 justify-end right-6 absolute"
            >
              <GuestPickerCompoenent
                selectedNumber={selectedNumber}
                setSelectedNumber={setSelectedNumber}
              />
            </View>
          </View>
        </View>
        <View
          className="flex-1 "
        >
          <FindSlot
            date = {date}
            selectedNumber = {selectedNumber}
            slots = {slotData}
            selectedSlot = {selectedSlot}
            setSelectedSlot = {setSelectedSlot}
          /> 
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Restaurant