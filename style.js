import styled from 'styled-components';
import {View,Image,Text,TextInput,TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight=Constants.statusBarHeight;
//colors

export const Colors={
    primary:'#ffffff',
    secondary:'#E5E7EB',
    tertiary:'#1F2937',
    darkLight:'#9CA3AF',
    brand:'#6D28D9',
    green:'#10B981',
    red:'#EF4444',
    black:'#000000',
    blue:'#0096FF',
};
const{primary,secondary,tertiary,darkLight,brand,green,red,black,blue}=Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px; 
    padding-top: ${StatusBarHeight + 20}px; 
    background-color: ${primary};   
`;    


export const InnerContainer = styled. View`
    flex: 1; 
    width: 100%; 
    align-items: center;
`;


export const PageLogo = styled.Image`
    width: 250px; 
    height: 200px;
`;

export const PageLogo1 = styled.Image`
    width: 500px; 
    height: 200px;
`;


export const PageTitle = styled. Text`
    font-size: 30px; 
    text-align: center; 
    font-weight: bold; 
    color: ${black}; 
    padding: 10px;
`; 

export const SubTitle = styled.Text`
    font-size:18px;
    margin-bottom:20px;
    letter-spacing:1px;
    font-weight:bold;
    color:${tertiary};
`;

export const StyledFormArea=styled.View`
    width:90%;
`;

export const StyledTextInput=styled.TextInput`
    background-color: ${secondary};
    padding:15px;
    padding-left:55px;
    padding-right:55px;
    border-radius:5px;
    font-size:16px;
    height:60px;
    margin-vertical:3px;
    margin-bottom:10px;
    color:${tertiary};
`;

export const StyledInputLabel = styled.Text`
    color:${tertiary};
    font-size:13px;
    text-align:left;
`;

export const LeftIcon=styled.View`
    left:15px;
    top:38px;
    position: absolute;
    z-index:1;    
`;

export const RightIcon=styled.TouchableOpacity`
    right:15px;
    top:38px;
    position: absolute;
    z-index:1;    
`;

export const StyledButton = styled.TouchableOpacity`
    padding:15px;
    background-color:${black};
    justify-content:center;
    align-items:center;
    border-radius:10px;
    margin-vertical:5px;
    height:60px;

    ${(props)=>props.google==true && `
    background-color:${red};
    flex-direction:row;
    justify-content:center;
    `}
`;

export const StyledButton1 = styled.TouchableOpacity`
    padding:15px;
    background-color:${red};
    justify-content:center;
    align-items:center;
    border-radius:30px;
    margin-vertical:1px;
    height:60px;
`;

export const StyledButton2 = styled.TouchableOpacity`
    padding:15px;
    background-color:${blue};
    justify-content:center;
    align-items:center;
    border-radius:10px;
    margin-vertical:5px;
    height:60px;
`;
export const StyledButton3 = styled.TouchableOpacity`
    padding:15px;
    background-color:${green};
    justify-content:center;
    align-items:center;
    border-radius:10px;
    margin-vertical:5px;
    height:60px;
`;
export const StyledButton4 = styled.TouchableOpacity`
    padding:15px;
    background-color:${black};
    justify-content:center;
    align-items:center;
    border-radius:10px;
    margin-vertical:5px;
    height:60px;
`;
export const ButtonText=styled.Text`
    color:${primary};
    font-size:20px;

    ${(props)=>props.google==true && `
    padding:1px;
    `}
`;

export const MsgBox =styled.Text`
    text-align:center;
    font-size:13px;
    color:${props=>(props.type=='SUCCESS' ? green : red)};

`;

export const Line = styled.View`
    height:1px;
    width:100%;
    background-color: ${darkLight};
    margin-vertical:10px;
`;    
export const ExtraView=styled.View `
    justify-content:center;
    flex-direction:row;
    align-items:center;
    padding:10px;
`;

export const ExtraText=styled.Text`
    justify-content:center;
    align-content:center;
    color:${tertiary};
    font-size:15px;
`;

export const TextLink=styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
`;

export const TextLinkContent=styled.Text`
    color:${brand};
    font-size:15px;
`;    

    