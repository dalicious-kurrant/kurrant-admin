export const getAccessToken =()=>{
    const token = localStorage.getItem('dash-token');
    console.log(token)
    return token
}