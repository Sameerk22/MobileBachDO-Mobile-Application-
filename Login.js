import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//API Client
import axios from 'axios';


//formik
import {Formik} from 'formik';

//icons
import {Octicons,Ionicons,Fontisto} from '@expo/vector-icons';
//View
import {View,ActivityIndicator} from 'react-native';

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

const Login=({navigation})=>{
    const [hidePassword,setHidePassword]=useState(true);
    const[message,setMessage]=useState();
    const[messageType,setMessageType]=useState();

    const handleLogin=(credentials,setSubmitting)=>{
        handleMessage(null);
        const url ='https://boiling-sands-64177.herokuapp.com/user/signin';
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
                <PageLogo resizeMode="cover" source={require('./../assets/img.jpg')}/>
                <PageTitle>MobileBachDo</PageTitle>
                <SubTitle>Account Login</SubTitle>

                <Formik
                    initialValues={{email:'',password:''}}
                    onSubmit={(values,{setSubmitting})=>{
                        //console.log(values);
                        if(values.email=='' || values.password ==''){
                            handleMessage('Please fill all the fields');
                            setSubmitting(false);
                        }else{
                            handleLogin(values,setSubmitting);
                        }
                    }}
                >
                    {({handleChange,handleBlur,handleSubmit,values,isSubmitting})=>(
                    <StyledFormArea>
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
                            <MsgBox type={messageType}>{message}</MsgBox>
                            { !isSubmitting && (<StyledButton onPress={()=> navigation.navigate('Homepage')}>
                                <ButtonText>Login</ButtonText> 
                            </StyledButton>)}

                            { isSubmitting && (
                            <StyledButton disabled={true} >
                                <ActivityIndicator size="large" color={primary}/> 
                            </StyledButton>
                            )}

                            <Line/>
                            <StyledButton google={true} onPress={handleSubmit}>

                                <Fontisto name="google" color={primary} size={25} />
                               <ButtonText google={true} >Sign in with Google</ButtonText> 
                            </StyledButton>
                            <ExtraView>
                                <ExtraText>Don't have an account already? </ExtraText>
                                
                           
                                <TextLink onPress={()=> navigation.navigate('Signup')}>
                                    <TextLinkContent>Signup</TextLinkContent>
                                </TextLink>
                                
                                
                                
                                </ExtraView> 

                        </StyledFormArea>
                    )}


                </Formik>
            </InnerContainer>
        </StyledContainer>

    );
};

const MyTextInput = ({label,icon,isPassword,hidePassword,setHidePassword, ...props})=>{
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={black}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword &&(
                <RightIcon onPress={()=> setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                
                </RightIcon>



            )}



        </View>
    );
};

export default Login;