import { Box } from "@mui/material";
import Nav from "./components/Nav";
import RecentSubmissions from "./components/RecentSubmissions";

export default function Home() {
  return (
    <>
      <Nav />
      {/* TODO: cheap fix with height on line 10, property subtrack of nav height and
      standardize */}
      <Box height={"87vh"} display={"flex"} justifyContent={"center"}>
        <RecentSubmissions />
      </Box>
    </>
  );
}
