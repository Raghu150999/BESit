import axios from 'axios';

export const authorize = async function (token) {
    
    if (!token) {
        return new Promise((resolve, reject) => {
            resolve({ success: false });
        });
    }
    let res = await axios.get('/api/authorize', {
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
