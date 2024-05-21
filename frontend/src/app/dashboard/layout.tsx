"use client";

import NavBar from "@/components/NavBar";
import { getUserInfo } from "@/api/authenticationAPI";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  if (userData === null) {
    return <h1>Loading...</h1>;
  }
  if (userData == false) {
    return <h1>Error occured while redirecting..</h1>;
  }

  console.log(userData);

  return (
    <>
      <NavBar userData={userData} />
      <div className="h-full bg-gray-200 overflow-scroll">{children}</div>
    </>
  );
}
