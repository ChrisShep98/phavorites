"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
      router.replace("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid Credentials");
      } else {
        router.replace("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack height={"100vh"} flexDirection={"row"}>
      <Stack
        sx={{
          height: "100vh",
          width: "70%",
          backgroundImage: "url(/images/phishfisheye.jpg)",
          backgroundSize: "cover",
        }}
      ></Stack>
      <Stack justifyContent={"center"} ml={5} width={"30%"}>
        <Typography variant="h3" color={"blue"} fontWeight={""}>
          Login
        </Typography>
        <Typography>Welcome ! Login below</Typography>
        <form onSubmit={handleSubmit} className="loginForm">
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            type="text"
          ></TextField>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          ></TextField>
          <Button type="submit">Login</Button>
        </form>
        {error && <Typography color={"red"}>{error}</Typography>}
        <Link href={"/register"}>Don't have an account? Register here</Link>
      </Stack>
    </Stack>
  );
};

export default LoginForm;
