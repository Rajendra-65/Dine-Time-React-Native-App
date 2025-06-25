import { db } from "@/config/firebaseConfig"
import { restaurantTypes } from "@/types/restaurants"
import { BlurView } from "expo-blur"
import { collection, getDocs, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, ImageBackground, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import homeBanner from '../../assets/images/homeBanner.png'
import logo from '../../assets/images/logo.png'

export default function Home() {

  useEffect(() => {
    getRestaurants()
  }, []);

  const [restaurants, setrestaurants] = useState<restaurantTypes[]>([])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="bg-[#f5f5f5] w-64 mr-4 rounded-xl shadow-lg overflow-hidden"
      style={{
        elevation: 5, // for Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }}
    >
      <Image
        resizeMode="cover"
        source={{ uri: item.image }}
        style={{
          width: '100%',
          height: 150,
        }}
      />
      <View className="p-3">
        <Text className="text-[#2b2b2b] text-lg font-bold mb-1">
          {item.name}
        </Text>
        <Text className="text-[#555] text-base mb-1">
          {item.address}
        </Text>
        <Text className="text-[#fb9b33] text-sm font-semibold">
          Open: {item.opening} | Close: {item.closing}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const getRestaurants = async () => {
    const q = query(collection(db, 'restaurants'));
    const res = await getDocs(q)
    const restaurantList = [];
    res.forEach((item) => {
      restaurantList.push(item.data());
    });
    setrestaurants(restaurantList);
    console.log("fetched...")
  }


  return (
    <SafeAreaView style={{ backgroundColor: '#2b2b2b', flex: 1, paddingBottom: 20 }}>
      <ScrollView>
        {/* Welcome section */}
        <View className="flex items-center justify-center">
          <View className="bg-[#f5f5f5] w-11/12 rounded-lg shadow-lg justify-between items-center">
            <View className="flex flex-row">
              <Text className={`text-base h-10 pt-[${Platform.OS === 'ios' ? 8 : 6.5}] align-middle text-[#2b2b2b] mt-2`}>
                {" "}Welcome to {" "}
              </Text>
              <Image
                resizeMode="cover"
                className="w-20 h-12 mt-1"
                source={logo}
              />
            </View>
          </View>
        </View>

        {/* Banner */}
        <ImageBackground
          resizeMode='cover'
          className="mb-4 w-full bg-[#2b2b2b] h-52 items-center justify-center"
          source={homeBanner}
        >
          <BlurView
            intensity={Platform.OS === 'android' ? 100 : 40}
            tint="dark"
            className="w-full p-4 shadow-lg"
          >
            <Text className="text-center text-3xl font-bold text-white">
              Dine With Your Loved Ones
            </Text>
          </BlurView>
        </ImageBackground>

        {/* Special Discounts */}
        <Text className="font-medium text-lg p-2 text-[#fb9b33]">Special Discounts %</Text>
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            keyExtractor={(item, index) => `discount-${index}`}
            contentContainerStyle={{ paddingLeft: 10, paddingRight: 16, paddingBottom: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <ActivityIndicator animating color="#fb9b33" />
        )}

        {/* Our Restaurants */}
        <Text className="font-medium text-lg p-2 text-[#fb9b33]">Our Restaurants</Text>
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            keyExtractor={(item, index) => `restaurant-${index}`}
            contentContainerStyle={{ paddingLeft: 10, paddingRight: 16, paddingBottom: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <ActivityIndicator animating color="#fb9b33" />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}