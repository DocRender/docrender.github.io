import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";

import HomePage from "./pages/home";
import SchemaPage from "./pages/schema";
import SchemasPage from "./pages/schemas";
import reportWebVitals from "./reportWebVitals";

import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

dayjs.locale("zh-cn");

root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/schemas/:slug" element={<SchemaPage />} />
          <Route path="/schemas" element={<SchemasPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </ConfigProvider>
  </React.StrictMode>
);

reportWebVitals();
