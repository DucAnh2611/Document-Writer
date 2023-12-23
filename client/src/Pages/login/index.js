import { config_api } from "../../APIs/ApiConfig";
import ButtonWithText from "../../Component/Button/ButtonWithText";
import { LoginMain } from "./styled";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function LoginPage() {

    const handleLoginWithGoogle = async () => {
        try {
            // Gets authentication url from backend server
            const res = await fetch((`${config_api.base_uri_local}/${config_api.auth.google}/url`));
            const {url} = await res.json();
            // Navigate to consent screen
            window.location.assign(url);
          } catch (err) {
            console.error(err);
          }
      
    }

    return (
        <LoginMain>
            <div>
                <h1>Login</h1>
                <ButtonWithText onClick={handleLoginWithGoogle} icon={faGoogle} text={"Login with Google"} />
            </div>
        </LoginMain>
    )
}