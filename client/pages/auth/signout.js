import { useEffect } from "react";
import UseRequest from "../../hooks/use-request";
import Router  from "next/router";
//server does not know what to do with cookies, so request should come from client or simply not from getinitialprops

export default function Signout(){
    const {doRequest} = UseRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    })
    // [] means ru only one time
    useEffect(()=>{
        doRequest();
    }, [])

    return <div> Signing you out....</div>
}
