import { useRouter } from "expo-router";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Frame from "../assets/images/Frame.png";
import logo from "../assets/images/logo.png";

export default function Index() {
  const router = useRouter()
  return (
    <SafeAreaView className="bg-[#2b2b2b]">
      <StatusBar barStyle="light-content" backgroundColor="#3e3" />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View
          className="m-2 flex justify-center items-center"
        >
          <Image
            source={logo}
            style={{ width: 300, height: 300 }}
          />
          <View className="w-3/4">
            <TouchableOpacity
              onPress={() => router.push('/signup')}
              className="p-2 my-2 bg-[#f49933] text-black rounded-lg"
            >
              <Text
                className="text-lg font-semibold text-center"
              >
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/home')}
              className="p-2 my-2 bg-[#2b2b2b] border-[#f49933] max-w-fit rounded-lg"
            >
              <Text
                className="text-lg font-semibold text-center text-[#f49933]"
              >
                Guest User
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-center text-base font-semibold py-4 text-white">
              <View className="border-b-2 border-[#f49933] p-2 mb-1 w-24" /> or {" "}
              <View className="border-b-2 border-[#f49933] p-2 mb-1 w-24" />
            </Text>
            <TouchableOpacity
              className="flex flex-row items-center justify-center"
              onPress={() => router.push('/signin')}
            >
              <Text className="text-white">Already a user ?</Text>
              <Text className="text-lg font-semibold underline text-[#f49933] ml-2">
                SignIn
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className = "flex-1">
          <Image 
            source = {Frame}
            className = "w-full h-full"
            resizeMode = "contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}