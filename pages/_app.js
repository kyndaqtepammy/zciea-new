import '../styles/globals.css'
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import Sidebar from '../components/nav/Sidebar';
import PagesHeader from '../components/header/Pageheader';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const dashRoutes = [
    "/dashboard",
    "/users", "/member", "/view-members",
    "/territories", "/reports", "/profile", "/settings", "/events", "/import", "/active", "/inactive",
  ]

  const showAdminDash = dashRoutes.includes(router.pathname) ? true : false;
  return <>
  {showAdminDash ? <Sidebar><Component {...pageProps} /></Sidebar> : <Component {...pageProps}/>}</>
}

export default MyApp
