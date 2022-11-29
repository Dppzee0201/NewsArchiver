import axios from 'axios'

const ValidateLocalToken = async () =>
{
    if((localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")) == null)
    return false;


    try
    {
        const res = await axios.post("https://news-app-api-22.herokuapp.com/auth/login", '' , {'headers': {'authorization' : 'Bearer ' + (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"))}});
        if(res.data.msg === "logged in with token")
        {
            console.log("loggin in with local token");
            return true;
        }
        else
        {
            console.log("Invalid local Token");
            return false;
        }
        
    }catch(err)
    {
        console.log(err);
    }
}

export default ValidateLocalToken;