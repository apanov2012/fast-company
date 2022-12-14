const TOKEN_KEY = "jwtToken";
const REFRESH_TOKEN = "jwtRefreshToken";
const EXPIRES_KEY = "jwtExpires";
const USER_ID_KEY = "userLocalId";

export function setTokens({ refreshToken, idToken, localId, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USER_ID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
}
export function getUserId() {
    return localStorage.getItem(USER_ID_KEY);
}
export function getExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}
export function removeAuthData() {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(EXPIRES_KEY);
}
const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresDate,
    getUserId,
    removeAuthData
};
export default localStorageService;
