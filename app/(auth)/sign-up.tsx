import {View, Text, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import {createUser} from "@/lib/appwrite";

const SignUp = () => {
  const [ isSubmitting, setSubmitting ] = useState(false);
  const [form,setForm] = useState({
    name:"",
    email: "",
    password: "",
  })

  const submit = async () => {

    const {name, email, password} = form;
    if(!email || !name || !password){
      return Alert.alert("Error","Please enter valid email address");
    }

    setSubmitting(true);

    try {
      await createUser({name,email, password })

      router.replace("/")
    } catch (error:any) {
      Alert.alert("Error", error.message);
    }finally {
      setSubmitting(false);
    }
  }
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter Your Full Name"
        value={form.name}
        onChangeText={(text:string)=>{setForm((prev) => ({
          ...prev,name:text
        }))}}
        label="Full Name"
      />

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
        title="Sign Up"
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  )
}
export default SignUp
