import { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import passwordComplexity from "joi-password-complexity";
import TextField from "../../components/Inputs/TextField";
import Select from "../../components/Inputs/Select";
import Radio from "../../components/Inputs/Radio";
import Checkbox from "../../components/Inputs/Checkbox";
import Button from "../../components/Button";
import logo from "../../images/image1.png";
import styles from "./styles.module.scss";



const genders = ["male", "female"];

const SignUp = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const history = useHistory();

  const handleInputState = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleErrorState = (name, value) => {
    value === ""
      ? delete errors[name]
      : setErrors(() => ({ ...errors, [name]: value }));
  };

  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    name: Joi.string().min(5).max(10).required().label("Name"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        setIsFetching(true);
        const url = "http://www.localhost:8080/api/users/signup";
        await axios.post(url, data);
        setIsFetching(false);
        toast.success("Account created successfully");
        history.push("/login");
      } catch (error) {
        setIsFetching(false);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          toast.error(error.response.data);
        } else {
          console.log(error);
          toast.error("Something went wrong!");
        }
      }
    } else {
      console.log("please fill out properly");
    }
  };

  return (
    <div className={styles.container}>
      
      <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      <h1 style={{ textAlign:"center", color: "black", width: "80rem", fontSize: "4rem" }}>Sign up for free to start listening.</h1>
      <form onSubmit={handleSubmit} className={styles.form_container} 		  style={{alignItems:"center"}}
>
        
        <div className={styles.input_container} style={{  Width:"50rem"}}>
          <TextField 
		  style={{textAlign:"center"}}
            label="What's your email?"
            placeholder="Enter your email"
            name="email"
            handleInputState={handleInputState}
            schema={schema.email}
            handleErrorState={handleErrorState}
            value={data.email}
            error={errors.email}
            required={true}
          />
        </div>
        <div style={{alignItems:"center"}} className={styles.input_container}>
          <TextField
		  		  style={{textAlign:"center"}}

            label="Create a password"
            placeholder="Create a password"
            name="password"
            handleInputState={handleInputState}
            schema={schema.password}
            handleErrorState={handleErrorState}
            value={data.password}
            error={errors.password}
            type="password"
            required={true}
          />
        </div>
        <div className={styles.input_container}>
          <TextField
		  		  style={{textAlign:"center"}}

            label="What should we call you?"
            placeholder="Enter a profile name"
            name="name"
            handleInputState={handleInputState}
            schema={schema.name}
            handleErrorState={handleErrorState}
            value={data.name}
            error={errors.name}
            required={true}
          />
        </div>
       
        <div className={styles.input_container}>
          <Radio
            label="What's your gender?"
            name="gender"
            handleInputState={handleInputState}
            options={genders}
            required={true}
          />
        </div>
        <div style={{textAlign:"center" , width: "50rem"}} className={styles.checkbox_container}>
          <Checkbox
            required={true}
            label="Share my registration data with Samma3ni's content providers for marketing purposes."
          />
        </div>
       
        <div className={styles.submit_btn_wrapper}>
          <Button label="Sign Up" type="submit" isFetching={isFetching} />
        </div>
        <p className={styles.terms_condition} style={{ fontSize: "1.6rem" }}>
          Have an account? <Link to="/login"> Log in.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
