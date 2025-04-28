
export const getToken = () => {
    try {
        return JSON.parse(sessionStorage.getItem('token'));
    } catch {
        return null;
    }
};