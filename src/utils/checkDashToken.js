export const getAccessToken =()=>{
    const token = localStorage.getItem('dash-token');
    return token
}