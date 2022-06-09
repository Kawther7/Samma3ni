import { useState, useRef} from "react";
import { Link } from "react-router-dom";
import TextField from "../../components/Inputs/TextField";

import Button from "../../components/Button";
import logo from "../../images/image1.png";
import styles from "./styles.module.scss";
import { useAuth } from "../../context/authContext"


const ForgotPassword = () => {
 
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
  
    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
        setMessage("")
        setError("")
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage("Check your inbox for further instructions")
      } catch {
        setError("Failed to reset password")
      }
  
      setLoading(false)
    }
  

  return (
    <div className={styles.container}>
      
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      
      <main className={styles.main}>
        <h1 className={styles.heading}>Reset Password .</h1>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <div className={styles.input_container}>
            <TextField
              label="Enter your email"
              placeholder="Enter your email"
              name="email"
              id="email"
              ref={emailRef} 
              required={true}
            />
          </div>
         
          <p className={styles.forgot_password}><Link to="/login"> Log In</Link></p>
          <div className={styles.form_bottom}>
            <Button disabled={loading}
			        className= "p-3 shadow-lg"
              type="submit"
              label="Reset"
              style={{ color: "white", background: "purple", width: "20rem" }}
            />
          </div>
        </form>
      
      </main>
    </div>
  );
};

export default ForgotPassword;
