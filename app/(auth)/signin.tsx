import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import Frame from "../../assets/images/Frame.png";
import logo from "../../assets/images/logo.png";

const SignUp = () => {
  const router = useRouter();

  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password too short!")
      .required("Password is required"),
  });

  const handleSignIn = (values) => {
    console.log("Form values:", values);
    // 👉 You can call your API here
  };

  return (
    <SafeAreaView className="bg-[#2b2b2b] flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#3e3" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ width: 300, height: 100 }} />
          <Text className="text-lg text-center text-white font-bold mb-10">
            Let&apos;s Get you Started..
          </Text>
        </View>

        <View className="w-5/6 self-center">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignUpSchema}
            onSubmit={handleSignIn}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View className="p-4">
                {/* Email Input */}
                <Text className="text-[#f49933] m-1">Email</Text>
                <TextInput
                  className="border-2 border-[#f49933] p-2 rounded mb-2 text-white"
                  placeholder="Email"
                  placeholderTextColor="#aaa"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && touched.email && (
                  <Text className="text-red-500 mb-2">{errors.email}</Text>
                )}

                {/* Password Input */}
                <Text className="text-[#f49933] m-1">Password</Text>
                <TextInput
                  className="border-2 border-[#f49933] p-2 rounded mb-2 text-white"
                  placeholder="Password"
                  placeholderTextColor="#aaa"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <Text className="text-red-500 mb-2">{errors.password}</Text>
                )}

                {/* Submit Button */}
                <TouchableOpacity
                  className="bg-[#f49933]  p-3 rounded items-center mt-2"
                  onPress={handleSubmit}
                >
                  <Text className="text-white font-semibold">Sign In</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>

        <View className="flex-1 relative">
          <Image
            source={Frame}
            className="w-full h-full"
            resizeMode="contain"
          />

          

          <TouchableOpacity
            className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-row items-center justify-center"
            onPress={() => router.push('/signup')}
          >
            <Text className="text-white">Don&apos;t Have an account ?</Text>
            <Text className="text-lg font-semibold underline text-[#f49933] ml-2">
              Signup
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;