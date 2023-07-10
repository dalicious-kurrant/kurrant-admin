export const getAccessToken =()=>{
    const token = localStorage.getItem('chain-token');
    console.log(token)
    return token
}