import axios from 'axios'
import React, { Component } from 'react';

export const authorize = async function (token) {
    
    if (!token) {
        return new Promise((resolve, reject) => {
            resolve({ success: false });
        });
    }
    let res = await axios.get('http://localhost:8000/api/authorize', {
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
