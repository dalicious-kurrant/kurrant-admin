export const getAccessToken =()=>{
    const token = localStorage.getItem('dash-token');
    return token
}
export const getAccessTokenName =()=>{
    const name = localStorage.getItem('dash-name');
    return name
}