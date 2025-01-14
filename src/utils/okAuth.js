export const authorize = () => {
    const params = new URLSearchParams({
        client_id: process.env.REACT_APP_OK_APP_ID,
        response_type: "token",
        redirect_uri: process.env.REACT_APP_OK_REDIRECT_URI,
    });
    window.location.href = `https://connect.ok.ru/oauth/authorize?${params}`;
};
