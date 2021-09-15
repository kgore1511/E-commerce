import React from 'react';
import axios from "axios";
function createAdminScreen(props){

    const createAdmin=()=>{
         axios.get("/api/createadmin").then(res=>{
            alert("Admin is Created")
            props.history.push("/")
        })
    }

       return <center><button onClick={()=>createAdmin()}>create Admin</button></center>
}
export default createAdminScreen;
