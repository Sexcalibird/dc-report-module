import { Result, Spin } from "antd";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { keys } from "../constants";
import { paths } from "../constants/paths";
import { doLogin } from "../ducks/slices/auth.slice";
import { useQuery } from "../hooks/useQuery";
import i18n, { languageKeys } from "../i18n";
import { NotFound } from "./elements";
import { store } from "../ducks/index.js";
import MainLayout from "../layouts/MainLayout/MainLayout.jsx";
import {ReceptionReport} from "../pages/index.js";

const Root = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.user);
  const localAccessToken = localStorage.getItem(keys.ACCESS_TOKEN);

  useEffect(() => {
    let accessToken = localAccessToken;
    let refreshToken = localStorage.getItem(keys.REFRESH_TOKEN);

    const queryAccessToken = query.get("access_token");
    const queryRefreshToken = query.get("refresh_token");

    if (!!queryAccessToken && !!queryRefreshToken) {
      accessToken = queryAccessToken;
      refreshToken = queryRefreshToken;

      localStorage.setItem(keys.ACCESS_TOKEN, accessToken);
      localStorage.setItem(keys.REFRESH_TOKEN, refreshToken);

      console.log("Update new access & refresh token");
    }

    console.log("access_token", accessToken);
    console.log("refresh_token", refreshToken);

    if (!!accessToken) {
      getUserInfo(accessToken);
    } else {
      window.location.href = apiServices.URL_CIS;
    }
  }, [query]);

  const Redirect = () => {
    const user = store.getState()?.auth?.user;
    console.log(store.getState())
    if (!user) {
      return <Result status="404" title="404" subTitle="Bạn không có quyền truy cập trang này" />;
    }
    let path = paths.DM_KHOA;
  
    return <Navigate to={path} replace />;
  };
  
  const getUserInfo = async (token) => {
    const info = jwtDecode(token);

    dispatch(doLogin(info));
  };

  if (!userProfile) {
    return (
        <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
        >
          <Spin spinning />
          <h3 className="blue-txt" style={{marginTop: 10}}>Hệ thống đang cập nhật thông tin tài khoản...</h3>
        </div>
    );
  }

  return <Outlet/>

}

const Redirect = () => {
  const user = store.getState()?.auth?.user;
  // if (!user) {
  //   return <Result status="404" title="404" subTitle="Bạn không có quyền truy cập trang này" />;
  // }
  let path = paths.REPORT;
  
  return <Navigate to={path} replace />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Redirect />,
      },
      {
        path: paths.REPORT,
        element: (
            <MainLayout />
        ),
        children: [
          // {
          //   index: true,
          //   element: <RedirectKhoiTao />,
          // },
          {
            index: true,
            path: paths.RECEPTION_RP,
            element: <ReceptionReport />,
          },
        ]
      }
    ]
  },
]);
