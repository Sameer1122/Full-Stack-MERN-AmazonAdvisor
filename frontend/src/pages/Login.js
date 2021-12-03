import { motion } from "framer-motion";
import React from "react";
import { pageAnimation, pageTransition } from "../animation/animation";
import LoginComponent from "../components/Login";

const Login = (props) => {
  return (
    <motion.div
      initial="in"
      animate="out"
      exit="exit"
      variants={pageAnimation}
      transition={pageTransition}
    >
      <LoginComponent login={props.login} />
    </motion.div>
  );
};

export default Login;
