import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Tweet from "./pages/Tweet";
import CreateTweet from "./pages/CreateTweet";
import Loader from "./components/Loader";
import EditTweet from "./pages/EditTweet";

export default function Router() {
    const user = useSelector((state) => state.auth.user);

    return (
        <>
            {user !== undefined ? (
                <Routes>
                    {user === null ? (
                        <>
                            <Route path="*" element={<Navigate to="/login" />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                        </>
                    ) : (
                        <>
                            <Route element={<Layout />}>
                                <Route path="*" element={<Navigate to="/" />} />
                                <Route path="/" element={<Home />} />
                                <Route path="/tweet/create" element={<CreateTweet />} />
                                <Route path="/tweet/:id" element={<Tweet />} />
                                <Route path="/tweet/edit/:id" element={<EditTweet />} />
                                <Route path="/profile" element={<Profile />} />
                            </Route>
                        </>
                    )}
                </Routes>
            ) : (
                <div className="h-screen w-full">
                    <Loader white />
                </div>
            )}
        </>
    );
}
