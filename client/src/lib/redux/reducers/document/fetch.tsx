import { config } from "../config";

const base_uri = `${config.be_uri}/${config.document}`;

export const create = async (userid:number) => {
    const res = await fetch(`${base_uri}/create`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({

        })
    })

    const data = await res.json();

    return data;
};

export const list = async (
    {key, page, limit} :
    {userid: number, key:String, page: number, limit:number}
    ) => {
    const res = await fetch(`${base_uri}/list?key=${key}&page=${page}&limit=${limit}`, {
        method: "GET"
    })

    const data = await res.json();

    return data;
}

export const info = async (docid: String) => {
    const res = await fetch(`${base_uri}/${docid}/info`, {
        method: "GET"
    })

    const data = await res.json();

    return data;
}

export const update = async (doc:Object) => {
    const res = await fetch(`${base_uri}/update`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(doc)
    })

    const data = await res.json();

    return data;
}