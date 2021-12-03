import Home from "./pages/Home";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Admin from "./pages/Admin";
import { useEffect, useState, useCallback } from "react";
import "./index.css";
import DetailEntry from "./pages/DetailEntry";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./ScrollToTop";
import Login from "./pages/Login";
import instance from "./api/axios";

function App() {
  const [mProfiler, setmProfiler] = useState([]);
  const [cmntData, setcmntData] = useState([]);
  const [mPostData, setmPostData] = useState([]);
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [loading, setloading] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const history = useHistory();
  //Login Function
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  //login getData From Loaal Storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  // logOut Function

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
    history.push("/");
  }, [history]);

  const fetchData = useCallback(async () => {
    const req = await instance.get("/profile/61702cffc116feeeac8cdb8b");
    setmProfiler(req.data.profile);

    const req2 = await instance.get("/stories");
    setmPostData(req2.data);
    const req3 = await instance.get("/comments");
    setcmntData(req3.data);
  }, []);
  const fetchData2 = useCallback(async () => {
    setloading(true);
    const req = await instance.get("/profile/61702cffc116feeeac8cdb8b");
    setmProfiler(req.data.profile);

    const req2 = await instance.get("/stories");
    setmPostData(req2.data);
    const req3 = await instance.get("/comments");
    setcmntData(req3.data);
    setloading(false);
  }, []);

  const searchPost = async (data) => {
    console.log(data);
    setmPostData(data);
  };

  // const fetchStories = useCallback(async () => {

  // }, []);
  // const fetchComment = useCallback(async () => {
  //   try {
  //     const req = await instance.get("/comments");
  //     setcmntData(req.data);
  //   } catch (error) {}
  // }, []);
  useEffect(() => {
    fetchData2();
  }, [fetchData2]);
  if (!mProfiler) {
    return (
      <div class="flex items-center justify-center space-x-2 animate-bounce h-screen">
        <div class="w-8 h-8 bg-black rounded-full"></div>
        <div class="w-8 h-8 bg-orange rounded-full"></div>
        <div class="w-8 h-8 bg-white rounded-full"></div>
      </div>
    );
  }
  // useEffect(() => {
  //   async function fetchStories() {
  //     const req = await instance.get("/stories");
  //     setmPostData(req.data);
  //   }
  //   fetchStories();
  // }, []);

  // useEffect(() => {
  //   async function fetchComment() {
  //     const req = await instance.get("/comments");
  //     setcmntData(req.data);
  //   }
  //   fetchComment();
  // }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/admin">
          <Admin
            search={searchPost}
            fetchData={fetchData}
            postData={mPostData}
            Profile={mProfiler}
            logout={logout}
            token={!!token}
          />
        </Route>
        <Route path="/adminEntry:entryId">
          <DetailEntry
            token={!!token}
            postData={mPostData}
            Profile={mProfiler}
            commentData={cmntData}
          />
        </Route>
        <Redirect to="/admin" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home
            postData={mPostData}
            Profile={mProfiler}
            token={!!token}
            fetchData={fetchData}
            search={searchPost}
          />
        </Route>

        <Route path="/entry/Entry:entryId">
          <DetailEntry
            token={!!token}
            postData={mPostData}
            Profile={mProfiler}
            commentData={cmntData}
            fetchData={fetchData}
          />
        </Route>

        <Route path="/login">
          <Login login={login} />
        </Route>
        <Route path="*">
          <NotFound token={!!token} />
        </Route>
      </Switch>
    );
  }
  let spin = (
    <div class="flex items-center justify-center space-x-2 animate-bounce h-screen">
      <div class="w-8 h-8 bg-black rounded-full"></div>
      <div class="w-8 h-8 bg-orange rounded-full"></div>
      <div class="w-8 h-8 bg-white rounded-full"></div>
    </div>
  );
  return (
    <div className="h-full">
      <ScrollToTop />
      {loading ? spin : routes}
    </div>
  );
}

export default App;
