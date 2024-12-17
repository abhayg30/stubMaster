import axios from "axios";

const BuildClient = ( { req } ) => {
    if(typeof window === 'undefined'){
        // we are on server! 
        //reqyest should be made to http://ingress-nginx.adasda/...
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
             //headers so that nginx knows the we are accessing host or else it will throw 404 not found error
            //if you hard refresh then current user would be null that is because we are not passing cookies, req.headers has cookies now it will work
            headers: req.headers
        })
    } else{
        return axios.create({
            baseURL: '/'
        })
    }
}

export default BuildClient