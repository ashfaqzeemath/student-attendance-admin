import {APIConstants, LocalStorage, APIUrl} from "./constants";

const joinQueryParams = (params) => {
    return Object.keys(params)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");
};

const fetchAccessTokenWithRefreshToken = async (refreshToken) => {
    return await fetchWithBasic(
        APIUrl.API_AUTH_REFRESH,
        null,
        APIConstants.HTTP_POST,
        APIConstants.DEFAULT_HEADER,
        refreshToken
    );
};

const getNewAccessToken = async () => {
    let tokenInfo = null;

    const refreshToken = LocalStorage.getRefreshTokenFromLocalStorage();

    if ( refreshToken ) {
        try {
            const json = await fetchAccessTokenWithRefreshToken(refreshToken);

            if (json && json.success && json.data) {
                tokenInfo = json.data;
                LocalStorage.setAccessTokenInfoToLocalStorage(tokenInfo);
            }
        } catch( err) {
            console.error("Access token: err : " + err);
        }
    }
    return tokenInfo;
};


export const fetchWithBasic = async (
    url,
    params = null,
    method = APIConstants.HTTP_GET,
    headers = APIConstants.DEFAULT_HEADER,
    body = {}
) => {

    let options = {
        method,
        headers,
    };

    if (params) {
        url = `${url}?${joinQueryParams(params)}`
    }

    if (method === APIConstants.HTTP_POST || method === APIConstants.HTTP_PUT) {
        options = {
            ...options,
            body: JSON.stringify(body)
        }
    }
    return await fetch(url, options);
    // try {
    //     const response = await fetch(url, options);
    //     return Promise.resolve(response.json())
    // } catch (error) {
    //     return Promise.reject(error);
    // }
}

export const fetchWithAuth = async (
    url,
    params,
    method = APIConstants.HTTP_GET,
    headers = APIConstants.DEFAULT_HEADER,
    body = {}
) => {

    if (!LocalStorage.getAccessTokenFromLocalStorage()) {
        logOut();
    }

    if (params) {
        url = `${url}?${joinQueryParams(params)}`
    }

    headers["Authorization"] = `Bearer ${LocalStorage.getAccessTokenFromLocalStorage()}`;

    let options = {
        method,
        headers,
    };

    if (method === APIConstants.HTTP_POST || method === APIConstants.HTTP_PUT) {
        options = {
            ...options,
            body: JSON.stringify(body)
        }
    }

    try {
        const response = await fetch(url, options);

        if (response.status === 401) {
            const newTokenInfo = await getNewAccessToken();

            if (newTokenInfo && options.headers) {
                options.headers["Authorization"] = `Bearer ${newTokenInfo.accessToken}`;
                const retriedResponse = await fetch(url, options);
                return Promise.resolve(retriedResponse.json());
            }
        }

        return Promise.resolve(response.json());

    } catch (error) {
        return Promise.reject(error);
    }
}

export const logOut = () => LocalStorage.clearAll();
