import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import AuthContent from "../components/auth/AuthContent";
import { login } from "../utils/authDataService";

function LoginScreen() {
    const dispatch = useDispatch();

    async function loginHandler({ login: username, password }) {
        try {
            const result = await login(username, password);
            if (result.status === 200) {
                const { accessToken, refreshToken } = result.data;
                dispatch(authActions.loginUser({ username, accessToken, refreshToken }));
            }
        } catch (error) {
            if (error.response && error.response.status === 404)
                alert(error.response.data.errors[0].msg);
        }
    }

    return <AuthContent isLogin={true} onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
