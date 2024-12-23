"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
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
        usernameOrEmail,
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
          name="usernameOrEmail"
          label="Username or Email"
          type="text"
          size="small"
          onChange={(e) => setUsernameOrEmail(e.target.value)}
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
  );
};

export default LoginForm;
