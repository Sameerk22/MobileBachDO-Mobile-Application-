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

const {brand,darkLight,primary,black}=Colors;

const Signup=({navigation})=>{
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
    

    const handleSignup=(credentials,setSubmitting)=>{
        handleMessage(null);
        const url ='https://boiling-sands-64177.herokuapp.com/user/signup';
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
                <SubTitle>Account Signup</SubTitle>

                {show && (
                 <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )} 



                

                <Formik
                    initialValues={{name:'',email:'',dateofbirth:'',password:'',confirmpassword:''}}
                    onSubmit={(values,{setSubmitting})=>{
                        values={...values,dateofbirth:dob};
                        if(values.email=='' || values.password =='' || values.name=='' || values.dateofbirth =='' || values.confirmpassword==''){
                            handleMessage('Please fill all the fields');
                            setSubmitting(false);
                        }else if (values.password!=values.confirmpassword){
                            handleMessage('Passwords donot match');
                            setSubmitting(false);
                        } else{
                            handleSignup(values,setSubmitting);
                        }
            
                    }}
                >
                    {({handleChange,handleBlur,handleSubmit,values,isSubmitting})=>(
                    <StyledFormArea>
                           <MyTextInput

                            label="Full Name"
                            icon="person"
                            placeholder="JohnSim"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            />

                            <MyTextInput
                            label="Email Address"
                            icon="mail"
                            placeholder="andy@gmail.com"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            /> 
                            <MyTextInput

                            label="Date of Birth"
                            icon="calendar"
                            placeholder="YYYY - MM - DD"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('dateofbirth')}
                            onBlur={handleBlur('dateofbirth')}
                            value={dob ? dob.toDateString() : ''}
                            isDate={true}
                            editable={false}
                            showDatePicker={showDatePicker}
                            />   

                            <MyTextInput

                            label="Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            />

                            <MyTextInput

                            label="Confirm Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('confirmpassword')}
                            onBlur={handleBlur('confirmpassword')}
                            value={values.confirmpassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            />
                            <MsgBox type ={messageType}>{message}</MsgBox>
                            

                            { !isSubmitting && (
                            <StyledButton onPress={()=> navigation.navigate('Homepage')}>
                                <ButtonText>Signup</ButtonText> 
                            </StyledButton>
                            )}

                            { isSubmitting && (
                            <StyledButton disabled={true} >
                                <ActivityIndicator size="large" color={primary}/> 
                            </StyledButton>
                            )}

                            <Line/>
            
                            <ExtraView>
                                <ExtraText>Already have an account? </ExtraText>
                                <TextLink onPress={()=> navigation.navigate('Login')}>
                                    <TextLinkContent>Login</TextLinkContent>
                                </TextLink>
                                
                                
                                </ExtraView> 

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
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput{...props}/>
                </TouchableOpacity>
            )}
            {isPassword &&(
                <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                
                </RightIcon>



            )}



        </View>
    );
};

export default Signup;