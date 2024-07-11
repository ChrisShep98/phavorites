import React from "react";
import LoginForm from "../components/LoginForm";
import { Stack, Box } from "@mui/material";

const Register = () => {
  return (
    <Stack mt={10} gap={2}>
      <Box
        display="flex"
        justifyContent={"center"}
        borderRadius={"35px"}
        px={2}
        className="animate__animated animate__backInDown"
      >
        <Box
          sx={{
            position: "absolute",
            height: "713px",
            width: "1024px",
            backgroundImage: "url(/images/phish_tickets.jpg)",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
      </Box>
      <LoginForm />
    </Stack>
  );
};

export default Register;
