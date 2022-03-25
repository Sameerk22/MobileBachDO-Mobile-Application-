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
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
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

const PostAd=({navigation})=>{
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
    

    const handlePostAd=(credentials,setSubmitting)=>{
        handleMessage(null);
        const url ='http://localhost:3000/user/signup';
        axios.post(url,credentials).then((response)=>{
            const result=response.data;
            const{message,status,data}=result;

            if (status!='SUCCESS'){
                handleMessage(message,status);
                //Code here if Welcome screen is present

            }//else navigate to welcome screen
            setSubmitting(false);

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
                <PageTitle>MobileBachDo</PageTitle>
                <SubTitle>Sell Your Mobile</SubTitle>

             
                <Formik
                    initialValues={{model:'',condition:'',description:'',city:'',price:''}}
                    onSubmit={(values,{setSubmitting})=>{
                
                        if(values.model=='' || values.condition =='' || values.description=='' || values.city =='' || values.price==''){
                            handleMessage('Please fill all the fields');
                            setSubmitting(false);
                        }
                         else{
                            handlePostAd(values,setSubmitting);
                        }
            
                    }}
                >
                    {({handleChange,handleBlur,handleSubmit,values,isSubmitting})=>(
                    <StyledFormArea>
                           <MyTextInput

                            label="Mobile Model"
                            icon="device-mobile"
                            placeholder="Samsung Galaxy S21"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('model')}
                            onBlur={handleBlur('model')}
                            value={values.model}
                            />

                            <MyTextInput
                            label="Condition"
                            icon="zap"
                            placeholder="Old"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('condition')}
                            onBlur={handleBlur('condition')}
                            value={values.condition}
                            
                            /> 
                            <MyTextInput
                            label="Description"
                            icon="checklist"
                            placeholder="PTA Approved 128gb"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                            
                            /> 
                            <MyTextInput
                            label="City"
                            icon="location"
                            placeholder="Islamabad"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('city')}
                            onBlur={handleBlur('city')}
                            value={values.city}
                            
                            /> 
                            <MyTextInput
                            label="Price"
                            icon="tag"
                            placeholder="120,000"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('price')}
                            onBlur={handleBlur('price')}
                            value={values.price}
                            
                            /> 
                        
                            <MsgBox type ={messageType}>{message}</MsgBox>
                            

                            { !isSubmitting && (
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Sell Now</ButtonText> 
                            </StyledButton>
                            )}

                            { isSubmitting && (
                            <StyledButton disabled={true} >
                                <ActivityIndicator size="large" color={primary}/> 
                            </StyledButton>
                            )}

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

export default PostAd;