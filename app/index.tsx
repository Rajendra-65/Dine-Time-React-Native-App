import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import logo from "../assets/images/logo.png";
export default function Index () {
  const router = useRouter()
  return(
    <SafeAreaView >
      <ScrollView contentContainerStyle = {{height:"100%"}}>
        <View
          className = "h-20"
        >
          {/* <Image
            source ={logo}
            style ={{width:300 , height: 300}}
          /> */}
          <Text
            className = "h-20 w-20 bg-red-300"
          >
            Hello
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}