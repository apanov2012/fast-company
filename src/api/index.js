import users from "./fake.api/user.api";
import professions from "./fake.api/professions.api.js";
const API = {
    users,
    professions
};
export default API;
// изначально users api импортировалось через import * as users from...
// Так не работало,импортировалось как модуль.
