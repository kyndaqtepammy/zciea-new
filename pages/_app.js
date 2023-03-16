import "../styles/globals.css";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import Sidebar from "../components/nav/Sidebar";
import PagesHeader from "../components/header/Pageheader";
import { useEffect } from "react";
import { LOGGED_IN, TOKEN } from "../constants";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const dashRoutes = [
    "/dashboard",
    "/users",
    "/member",
    "/view-members",
    "/territories",
    "/reports",
    "/profile",
    "/settings",
    "/events",
    "/import",
    "/active",
    "/inactive",
    "/add-users",
    "/all-users",
    "/active-inactive",
    "/add-member",
    "/edit-member",
    "/disability",
    "/member_id",
  ];

  const showAdminDash = dashRoutes.includes(router.pathname) ? true : false;
  return (
    <>
      {showAdminDash ? (
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
