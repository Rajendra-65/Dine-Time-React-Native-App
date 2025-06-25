import { db } from '@/config/firebaseConfig'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useLocalSearchParams } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Restaurant = () => {
  const { restaurant } = useLocalSearchParams();
  const [restaurantData, setRestaurantData] = useState({});
  const [carouselData, setCarouselData] = useState({});
  const [slotData, setSlotData] = useState();
  const FlastListRef = useRef(null)
  const windowWidth = Dimensions.get("window").width

  const carouselItem = ({item}) => {
    return(
      <View 
        style = {{width:windowWidth -2}}
        className = "h-64 relative rounded-[25px]"
      >
        <View 
          style = {{
            position:'absolute',
            top:"50%",
            backgroundColor:"rgba(0,0,0,0.6)",
            borderRadius : 50,
            padding : 5,
            zIndex : 10,
            right : "6%"
          }}
        >
          <Ionicons name="arrow-forward" size={24} color="white"/>
        </View>
        <View>
          <Image 
            source = {{uri:item}}
            style = {{
              opacity:0.5,
              backgroundColor:"black",
              marginRight:20,
              marginLeft:5
            }}
            className = "h-64"
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
          where("res_id", "==", doc.ref) // or doc.ref
        );
        const slotsSnapShot = await getDocs(slotsQuery);

        const slots = slotsSnapShot.docs.map(s => s.data());
        setSlotData(slots);
        console.log(carouselData)
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
          className = "h-54 max-w-[98%] mx-2 rounded-[25px]"
        >
          <FlatList
            ref={FlastListRef}
            data = {carouselData[0]?.images}
            renderItem = {carouselItem}
            horizontal
            scrollEnabled ={true}
            showsHorizontalScrollIndicator = {false}
            style = {{borderRadius:25}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Restaurant