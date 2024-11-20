"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/");
    }
  }, [session, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError(res.error);
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      position={"absolute"}
      p={6}
      borderRadius={"30px"}
      component="form"
      method="post"
      onSubmit={handleSubmit}
      sx={{ backgroundColor: "white" }}
    >
      <Stack rowGap={2}>
        <Typography variant="h3" color={"primary.main"} fontWeight={"600"}>
          Login
        </Typography>
        <Typography color={"#1c203d"}>Welcome ! Login below</Typography>

        <TextField
          name="username"
          label="Username"
          type="text"
          size="small"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          size="small"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outlined" type="submit">
          Login
        </Button>
        {error && (
          <Typography variant="caption" color="red" mt={1} textAlign="center">
            {error}
          </Typography>
        )}
      </Stack>
    </Box>
    // <Stack height={"100vh"} flexDirection={"row"}>
    //   <Stack
    //     sx={{
    //       height: "100vh",
    //       width: "89%",
    //       // backgroundImage: "url(/images/PHISH-LEMONWHEEL.jpg)",
    //       backgroundSize: "contain",
    //       backgroundPosition: "center",
    //     }}
    //   />
    //   <Box
    //     // className="animate__animated animate__fadeIn"
    //     boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
    //     mx={"auto"}
    //     width={"250px"}
    //     p={6}
    //     borderRadius={"30px"}
    //     component="form"
    //     method="post"
    //     mb={1}
    //   >
    //     <Stack rowGap={2}>
    //       <TextField
    //         name="username"
    //         label="Username"
    //         type="text"
    //         size="small"
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //       <TextField
    //         name="password"
    //         label="Password"
    //         type="password"
    //         size="small"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <TextField name="email" label="Email" type="email" size="small" />
    //       <Button type="submit" variant="outlined"></Button>
    //     </Stack>
    //   </Box>
    //   <Stack justifyContent={"center"} ml={5} width={"30%"}>
    //     <Typography variant="h3" color={"blue"} fontWeight={""}>
    //       Login
    //     </Typography>
    //     <Typography>Welcome ! Login below</Typography>
    //     <form onSubmit={handleSubmit} className="loginForm">
    //       <TextField
    //         onChange={(e) => setUsername(e.target.value)}
    //         placeholder="Username"
    //         type="text"
    //       ></TextField>
    //       <TextField
    //         onChange={(e) => setPassword(e.target.value)}
    //         type="password"
    //         placeholder="Password"
    //       ></TextField>
    //       <Button type="submit">Login</Button>
    //     </form>
    //     {error && <Typography color={"red"}>{error}</Typography>}
    //     <Link href={"/register"}>Don't have an account? Register here</Link>
    //   </Stack>
    // </Stack>
  );
};

export default LoginForm;
