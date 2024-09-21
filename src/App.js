import { useEffect } from "react";
import "./App.css";
import { DefaultLayout } from "./layouts/DefaultLayout/DefaultLayout";
import { publicRouter } from "./router/routes";
import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout/AdminLayout";
import SiteLayout from "./layouts/SiteLayout/SiteLayout";
import { jwtDecode } from "jwt-decode";
import { axiosJWT, getDetail, refreshToken } from "./services/userAPI";
import { updateUser } from "./redux/User/UserSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const handleGetDetailUser = async (id, token) => {
    const res = await getDetail(id, token);
    dispatch(updateUser({ ...res, access_token: token }));
  };
  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData) decoded = jwtDecode(storageData);
    return { decoded, storageData };
  };
  axiosJWT.interceptors.request.use(
    async (config) => {
      const current_time = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < current_time.getTime() / 1000) {
        const storageData = localStorage.getItem("refresh_token")
        const data = await refreshToken(storageData);
        config.headers["Authorization"] = "Bearer " + data?.access;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return (
    <div className="App">
      <Routes>
        {publicRouter?.map((route, index) => {
          const Page = route.component;
          const Layout =
            route.layout === "admin"
              ? AdminLayout
              : route.layout === "client"
              ? DefaultLayout
              : SiteLayout;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
