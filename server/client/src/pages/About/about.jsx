import { textAlign } from "@mui/system";
import { Link } from "react-router-dom";
import logo from "../../images/image1.png";
import styles from "./styles.module.scss";

const About = () => {
 
  return (
    <div className={styles.container}  style={{textAlign:"center" ,alignItems:"center", fontWeight:"800"}}>
      
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      
      <main className={styles.main} style={{fontSize:"50px" ,textAlign:"center" , width:"80rem" , fontWeight:"800"}}>
        <h1 style={{fontSize:"50px" ,textAlign:"center" , width:"80rem" , fontWeight:"800",textShadow:"2px 2px gray"}} >In case you missed anything.</h1>
        <h2 style={{fontSize:"30px" ,textAlign:"center" , width:"80rem" , fontWeight:"400",textShadow:"2px 2px gray"}}>About Us.</h2>
        <p style={{fontSize:"20px" ,textAlign:"center" , width:"80rem" , fontWeight:"500"}}>
          With Samma3ni, it’s easy to find the right music or podcast for every moment – on your phone, your computer, your tablet and more.
                Soundtrack your life. Subscribe or listen for free.
          </p>
          <p style={{fontSize:"70px",textShadow:"2px 2px gray"}}>
          Services 
          </p>
          <p style={{fontSize:"20px"}}>
          1.Help site. Check out our help site for answers to your questions and to learn how to get the most out of your music.
          </p>
          <p style={{fontSize:"20px"}}>
          2.Community. Get fast support from expert Samma3ni users. If there isn’t already an answer there to your question, 
          post it and someone will quickly answer. You can also suggest and vote on new ideas for Samma3ni or simply discuss music with other fans.
          </p>
       
      </main>
    </div>
  );
};

export default About;
