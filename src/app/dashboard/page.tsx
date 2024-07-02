import React from "react";
import UserInfo from "../components/UserInfo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RecentSubmissions from "../components/RecentSubmissions";

const Dashboard = async () => {
  // const session = await getServerSession();
  // if (!session) {
  //   redirect("/");
  // }
  return (
    <>
      <UserInfo />
      <RecentSubmissions />
    </>
  );
};

export default Dashboard;
