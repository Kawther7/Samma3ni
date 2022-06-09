import styled from "styled-components"
import {MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md'

export const HeroContainer = styled.div `
 background: aliceblue;
 display: flex;
 justify-content: center;
 align-items: center;
 padding: 0 30px;
 height: 800px;
 position: relatives;
 z-index:1;
 :before {
     content: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background: linear-gradient(180deb, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%),
                 linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%)
     z-index: 2;
 }
`
export const HeroBg = styled.div`
positon: absolute;
top:0;
right:0;
bottom:0;
left:0;
width:100%;
height: 100%;
overflow: hidden;
`

export const VideoBg = styled.video`
width: 100%;
height: 100%;
-o-object-fit: cover;
object-fit: cover;
background: #232a34;
`
export const HeroContent = styled.h1 `
z-index: 100%;
max-width: 1200px;
position: absolute;
padding: 8px 24px;
display: flex;
flex-direction: column;
align-items: center;
`
export const HeroH1 = styled.h1`
color: purple;
text-align: center;
font-size: 6rem;
font-weight: 900;
@media screen and (max-width:768px){
    font-size: 10px;
}
@media screen and (max-width:480px){
    font-size: 10px;
}
`

export const HeroP = styled.p `
 margin-top: 24px;
 color: lightpurple;
 font-size: 33px;
 text-align: center;
 max-width: 600px;
 @media screen and (max-width:768px){
    font-size: 24px;
}
@media screen and (max-width:480px){
    font-size: 18px;
}
`

export const HeroBtnWrapper = styled.div`
margin-top: 32px;
display: flex;
flex-direction: column;
align-items: center;
`



export const ArrowForward = styled(MdArrowForward)`
margin-left: 8px;
font-size: 20px;
`

export const ArrowRight = styled(MdKeyboardArrowRight)`
margin-left: 8px;
font-size: 20px;
`