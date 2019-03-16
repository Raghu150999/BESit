import axios from 'axios'

import {} from 'dotenv/config';

console.log(process.env.NODE_ENV);


export const authorize = async function (token) {
    
    if (!token) {
        return new Promise((resolve, reject) => {
            resolve({ success: false });
        });
    }
    let res = await axios.get('https://powerful-hamlet-87555.herokuapp.com/api/authorize', {
        params: {
            token: token
        }
    });
    return new Promise((resolve, reject) => {
        if (res.data.success) {
            resolve({ success: true, user: res.data.user });
        }
        else {
            resolve({ success: false, remove: true });
        }
    });
};
