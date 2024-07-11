import { Box } from "@mui/material";
import Nav from "./components/Nav";
import RecentSubmissions from "./components/RecentSubmissions";

export default function Home() {
  return (
    <>
      <Nav />
      <Box display={"flex"} justifyContent={"center"}>
        <RecentSubmissions />
      </Box>
    </>
  );
}
