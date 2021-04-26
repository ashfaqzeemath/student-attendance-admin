import {APIConstants, APIUrl, LocalStorage} from "./constants";
import {fetchWithBasic, logOut} from "./base.service";

export const signIn = async (username, password) => {
    if (!username || !password) {
        return;
    }
    try {
        const json = await fetchWithBasic(
            APIUrl.API_AUTH_SIGN_IN,
            null,
            APIConstants.HTTP_POST,
            APIConstants.DEFAULT_HEADER,
            {username, password}
        );

        if (json && json.success && json.data)
        {
            LocalStorage.setAccessTokenInfoToLocalStorage(json.data);
        }

        return Promise.resolve(json);

    } catch (err) {
        return Promise.reject(err);
    }
};

export const signUp = async (username, email, password) => {
    try {
        return await fetchWithBasic(
            APIUrl.API_AUTH_SIGN_UP,
            null,
            APIConstants.HTTP_POST,
            APIConstants.DEFAULT_HEADER,
            {username, username, password}
        );
    } catch (err) {
        return Promise.reject(err);
    }
};

export const signOut = () => logOut();