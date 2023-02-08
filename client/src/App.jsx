import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CircleLoading from "./components/ui/loading/CircleLoading";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Search from "./components/pages/Search";

const Layout = lazy(() => import("./components/layout/Layout"));
const Authentication = lazy(() => import("./components/pages/Authentication"));
const Wall = lazy(() => import("./components/pages/Wall"));
const Profile = lazy(() => import("./components/pages/Profile"));
const Chat = lazy(() => import("./components/message/chat/Chat"));
const Message = lazy(() => import("./components/pages/Message"));
const RequireAuth = lazy(() =>
  import("./components/authentication/RequireAuth")
);
const Persist = lazy(() => import("./components/authentication/Persist"));

function App() {
  return (
    <Suspense fallback={<CircleLoading />}>
      <Routes>
        <Route path="/auth/" element={<Authentication />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<Persist />}>
          <Route path="/" element={<Layout />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Navigate to="/wall/me" />} />
              <Route path="profile" element={<Profile />} />
              <Route path="wall/:id" element={<Wall />} />
              <Route path="message/" element={<Message />}>
                <Route path=":id" element={<Chat />} />
              </Route>
              <Route path="search" element={<Search />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/auth" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
