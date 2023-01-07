

import axios from 'axios'

export enum Ordering {
    ACTIVITY_DESC,
    TIME_DESC,
    TIME_ASC,
    VISITS_DESC,
    VISITS_ASC,
}

const config = {
    api: "https://williamgao09.com"
};
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: `${config.api}/nextWebsite/data`,
});

//response data is 
// 
export const getAggregateData = ()=> {
    return api.get("/agg")
}

export const getUsers = (sort : Ordering) => {
    return api.get(`/usersList/${Ordering[sort]}`)
}

export const getUserData = (uid : number) => {
    return api.get(`/single/${uid}`)
}