import { config_api } from "../../APIs/ApiConfig";

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
        <div>
            <button onClick={handleLoginWithGoogle}>Login with Google</button>
        </div>
    )
}