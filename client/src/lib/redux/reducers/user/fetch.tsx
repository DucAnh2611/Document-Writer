import { config } from "../config";

export const login = async ({
    username, password
} : 
{
    username: String,
    password: String
}) => {
    const res = await fetch(`${config.be_uri}/${config.user}/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    const data = await res.json();
    return data;
}

export const signup = async ({
    username, password, avatar
} : 
{
    username: String,
    password: String,
    avatar: String
}) => {
    const res = await fetch(`${config.be_uri}/${config.user}/signup`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
            avatar: avatar
        })
    });

    const data = await res.json();

    return data;
}
