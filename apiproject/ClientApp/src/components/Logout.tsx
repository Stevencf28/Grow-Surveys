import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Logout(){
    localStorage.removeItem("user");
    const navigate = useNavigate();
    useEffect(()=>{
        navigate("/", {replace: true});
        navigate(0);
    })
    return(<></>)
}