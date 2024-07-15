import { useDispatch } from "react-redux";
import AuthContent from "../components/auth/AuthContent";
import { createUser, login } from "../utils/authDataService";
import { authActions } from "../store/authSlice";

function SignupScreen() {
    const dispatch = useDispatch();

    async function signupHandler({ login: username, password }) {
        try {
            const result = await createUser(username, password);
            if (result.status === 200) {
                try {
                    const loginResponse = await login(username, password);
                    if (loginResponse.status === 200) {
                        const { accessToken, refreshToken } = loginResponse.data;
                        dispatch(
                            authActions.loginUser({ username, accessToken, refreshToken })
                        );
                    }
                } catch (loginError) {
                    console.error(loginError);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 422)
                alert("User already exists");
        }
    }

    return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;
