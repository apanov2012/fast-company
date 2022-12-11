const TOKEN_KEY = "jwtToken";
const REFRESH_TOKEN = "jwtRefreshToken";
const EXPIRES_KEY = "jwtExpires";

export function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
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
export function getExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}
const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresDate
};
export default localStorageService;
