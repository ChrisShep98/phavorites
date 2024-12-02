import React from "react";
import RegisterForm from "@/components/RegisterForm";
import { Stack, Box } from "@mui/material";

const Register = () => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      className="animate__animated animate__backInDown"
    >
      <Box
        sx={{
          height: "713px",
          width: "1024px",
          backgroundImage: "url(/images/phish_tickets.jpg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />
      <RegisterForm />
    </Stack>
  );
};

export default Register;
