import axios from 'axios';
// used this exported suthorize function over there in login component
export const authorize = async function (token) {
    // all beign done asychronously
    if (!token) { // if notoken is there directly return a promise  with false and res.data.success =false and res.data.remove=false bcz nthng ther to remove
        return new Promise((resolve, reject) => {
            resolve({ success: false }); // resolve false if we reject it is error confition should again handle that
        });
    }
    // else case
    let res = await axios.get('/api/authorize', { // call servers authorisze an dstore result whenever its done
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
