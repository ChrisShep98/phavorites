"use client";
import { Box, Stack, Typography } from "@mui/material";
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
          <input
            className="loginInput"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            color="red"
          ></input>
          <input
            className="loginInput"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          ></input>
          <button className="loginButton" type="submit">
            Login
          </button>
          {/* <button className="bg-blue-500 rounded-lg p-3 max-w-32 background text-white" type="submit">
            Login
          </button> */}
        </form>
        {error && <Typography color={"red"}>{error}</Typography>}
        <Link href={"/register"}>Don't have an account? Register here</Link>
      </Stack>
    </Stack>
  );
};

export default LoginForm;
