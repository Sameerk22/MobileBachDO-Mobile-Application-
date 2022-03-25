import React,{useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';

//formik
import {Formik} from 'formik';

//icons
import {Octicons,Ionicons,Fontisto} from '@expo/vector-icons';

import {View,TouchableOpacity,ActivityIndicator} from 'react-native';
import axios from 'axios';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageLogo1,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    StyledButton1,
    StyledButton2,
    StyledButton3,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from './../components/style';
import Signup from './Signup';
const {brand,darkLight,primary,black}=Colors;

const Homepage=({navigation})=>{
    const [hidePassword,setHidePassword]=useState(true);
    const [show,setShow]=useState(false);
    const [date,setDate]=useState(new Date(2000,0,1));
    const[message,setMessage]=useState();
    const[messageType,setMessageType]=useState();

    //Actual date of birth to be sent
    const[dob,setDob]=useState();
    const onChange=(event,selectedDate) =>{
        const currentDate=selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    const showDatePicker =() => {
        setShow(true);
    }
    //pasted from login
    

    const handleHomepage=(credentials)=>{
        handleMessage(null);
        const url ='http://localhost:3000/user/signup';
        axios.post(url,credentials).then((response)=>{
            const result=response.data;
            const{message,status,data}=result;

            if (status!='SUCCESS'){
                handleMessage(message,status);
                //Code here if Welcome screen is present

            }//else navigate to welcome screen
            

        })
        .catch((error)=>{
            console.log(error.JSON());
            setSubmitting(false);
            handleMessage("An error occured.Check your network and try again");
            
        });
    };

    const handleMessage=(message,type='FAILED')=>{
        setMessage(message);
        setMessageType(type);
    };





    return(
        <StyledContainer>
            <InnerContainer>
            <PageTitle>Homepage</PageTitle>
                <PageLogo1 resizeMode="cover" source={require('./../assets/img3.jpg')}/>
                
                <Formik
                    initialValues={{findmobile:''}}
                    
                >
                    {({handleChange,handleBlur,handleSubmit,values,})=>(
                    <StyledFormArea>
                           <MyTextInput

                            label="Find Mobiles"
                            icon="search"
                            placeholder="Iphone 13 pro max"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('findmobile')}
                            onBlur={handleBlur('findmobile')}
                            value={values.findmobile}
                            />

                           
                        
                            <MsgBox type ={messageType}>{message}</MsgBox>
                            

                            
                            <StyledButton1 >
                                <ButtonText>Search Now</ButtonText> 
                            </StyledButton1>



                            <StyledButton2 onPress={()=> navigation.navigate('PostAd')} >
                                <ButtonText>Post Your Ad</ButtonText> 
                            </StyledButton2>
                            <StyledButton2 >
                                <ButtonText>Avail MobileBachDo Services</ButtonText> 
                            </StyledButton2>
                            <StyledButton3 >
                                <ButtonText>Chat with Agents</ButtonText> 
                            </StyledButton3>

                            <Line/>

                        </StyledFormArea>
                    )}


                </Formik>
            </InnerContainer>
        </StyledContainer>

    );
};

       
         const MyTextInput = ({label,icon,isPassword,hidePassword,setHidePassword,isDate,showDatePicker, ...props})=>{
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={black}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput{...props}/>}
        </View>
    );
};

export default Homepage;