import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import * as Sentry from "@sentry/react-native"

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import {signIn} from "@/lib/appwrite";

const SignIn = () => {
  const [ isSubmitting, setSubmitting ] = useState(false);
  const [form,setForm] = useState({
    email: "",
    password: "",
  })
  
  const submit = async () => {
    const {email, password} = form;
   if(!email || !password){
     return Alert.alert("Error","Please enter valid email address and password");
   }

   setSubmitting(true);

   try {
     await signIn({email, password})
     router.replace("/")
   } catch (error:any) {
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error)
   }finally {
     setSubmitting(false);
   }
  }
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter Your Email"
        value={form.email}
        onChangeText={(text:string)=>{setForm((prev) => ({
          ...prev,email:text
        }))}}
        label="Email"
        keyboardType={"email-address"}
      />

      <CustomInput
        placeholder="Enter Your Password"
        value={form.password}
        onChangeText={(text:string)=>{setForm((prev) => ({
          ...prev,password:text
        }))}}
        label="Email"
        secureTextEntry={true}
      />
      <CustomButton
        title="Sign In"
        isLoading={isSubmitting}
        onPress={submit}
      />
      
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don't have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  )
}
export default SignIn
