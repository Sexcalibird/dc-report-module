import { Button } from "antd";
import React, { useRef } from "react";
import {RouterProvider} from "react-router-dom";
import { useAuth } from "../hooks";

import { router } from "./routes";

export const App = () => {
  const ref = useRef();

  useAuth(ref);

  const handleClickLogin = () => {
    localStorage.clear();

  };

  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>

  );
};
