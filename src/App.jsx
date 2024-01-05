import { useEffect } from "react";
import Router from "./Router";
import authToken from "./utils/storage";
import API, { get, responseValidator } from "./utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/authSlice";
import { useLocation } from "react-router-dom";
import { setSidebar } from "./redux/slices/layoutSlice";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(setSidebar(false));
    }, [location.pathname]);

    useEffect(() => {
        if (authToken.get()) {
            get(API.auth.me, (data, status) => {
                if (responseValidator(status)) {
                    dispatch(setUser(data));
                } else {
                    dispatch(setUser(null));
                    authToken.remove();
                }
            });
        } else {
            dispatch(setUser(null));
        }
    }, []);

    return <Router />;
}

export default App;
