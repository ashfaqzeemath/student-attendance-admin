import * as ApiConstance from "./APIConstants";

let windowObject = null;

if (typeof(window) !== "undefined") {
    windowObject = window;
}

const setLocalStorageItem = (key, data) => {
    if (windowObject !== null) {
        windowObject.localStorage.setItem(key, data);
    }
};

const getLocalStorageItem = key => {
    if (windowObject !== null) {
        const data = windowObject.localStorage.getItem(key);
        return data;
    }
    return null;
};

const setLocalStorageObject = (key, data) => {

    if (windowObject !== null) {
        windowObject.localStorage.setItem(key, JSON.stringify(data));
    }
};

const getLocalStorageObject = (key) => {
    if (windowObject !== null && (windowObject.localStorage.getItem(key))) {
        const data = JSON.parse(windowObject.localStorage.getItem(key));
        return data;
    }
    return null;
};

const removeLocalStorageItem = (key) => {
    if (windowObject !== null) {
        windowObject.localStorage.removeItem(key);
    }
};


// functions to get data from local storage

export const getAccessTokenFromLocalStorage = () => {
    const accessTokenInfo = getLocalStorageObject(ApiConstance.TOKEN_INFO);
    return accessTokenInfo ? accessTokenInfo.accessToken : null;
}

export const getRefreshTokenFromLocalStorage = () => {
    const accessTokenInfo = getLocalStorageObject(ApiConstance.TOKEN_INFO);
    return accessTokenInfo ? accessTokenInfo.refreshToken : null;
}

export const setAccessTokenInfoToLocalStorage = (infoObject) => {
    const accessTokenInfo = {
        accessToken: 'accessToken' in infoObject ? infoObject.accessToken : '',
        refreshToken: 'refreshToken' in infoObject ? infoObject.refreshToken : '',
        expiresIn: 'expiresIn' in infoObject ? infoObject.expiresIn : '',
    };
    setLocalStorageObject(ApiConstance.TOKEN_INFO, accessTokenInfo);
}

export const clearAll = () => {
    if (windowObject !== null) {
        windowObject.localStorage.clear();
    }
};