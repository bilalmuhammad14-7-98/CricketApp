import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions} from 'react-native'
import React from 'react'
import Logo from './../../../../assets/Images/Logo_1.png';
import { useTheme } from "@react-navigation/native";


import CustomButton from "../../../components/formComponents/CustomButton";
import Field from "../../../components/formComponents/Field";

const ForgotPassword = () => {
  const {height} = useWindowDimensions();
  const { colors } = useTheme();


  return (
    
    
    <View style = {styles.root}>
        <View style = {styles.image}>
          <Image source={Logo} style= {[styles.logo, {height: height * 0.2}]} 
          />
        </View>
  
      <View style = {styles.pass}>
          <Text style = {[styles.text2, { color: colors.heading }]}>
              Foot
          </Text>

          <Text style = {[styles.text2, { color: colors.heading }]}>
              Password?
          </Text>

          <Text style={styles.text3}>Don't worry it happens! Please enter the
          </Text>
          <Text style={styles.text3}>address associated with your account.
          </Text>
      </View>

          <View style = {styles.input}>

          <Field
            placeholder="Email ID"
            keyboardType={"email-address"}
          />

          <CustomButton
            textColor = {colors.white}
            btnLabel="Submit"
            Press={() => alert("Logged In")}
          />
          </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  root:{
      flex: 1,
  },

  image:{
    alignItems: 'center', 
    paddingTop: 50,
  },

  logo:{
      width:'70%',
      maxWidth:200,
      maxHeight: 200,

  },

  pass:{
    paddingTop: 30,
    paddingLeft: 20,
  },

  text2: {
    fontSize: 40,
    fontWeight: "bold",
  },

  
  text3: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    flexDirection: 'row',

  },

  input:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
  } ,
});


export default ForgotPassword;





{/* <View flex={1} bg = {colors.black}>
    <Image
    flex = {1}
    alt = "Logo"
    resizeMode='cover'
    size = 'lg'
    w = 'full'
    source={require ("../../../assets/Images/Logo_1.png")}
    />
    </View> */}
