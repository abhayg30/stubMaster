import 'bootstrap/dist/css/bootstrap.css';
import { Component } from 'react';
import BuildClient from '../api/build-client';
import Header from '../component/header';
//we defined custom App component so whenever we visit any route or file, next.js would bind everything in App component hence the pageProps --passed to Component
//Component would the content of routes like index.js
//_app file should have global css
const AppComponent = ({ Component, pageProps, currentUser}) =>{
    return (
    <div>
        <Header currentUser={currentUser}></Header>
        <Component currentUser={currentUser} {...pageProps}></Component>
    </div>
     
    )

}

//arguments to getinitialprops for custom app components is different from page components 
//if we tie getinitialprops to app component like here then getinitialprops inside the pages would not be tied and invoked like in index.js right now   
AppComponent.getInitialProps = async (appContext) => {
    const client = BuildClient(appContext.ctx);
    const {data} = await client.get('/api/users/currentuser')
    //this will call getinitialprops of the child page that we would be accessing
    let pageProps = {}
    if(appContext.Component.getInitialProps){
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    console.log(data)
    //uniformity with the AppComponent's parameters
    return {
        pageProps,
        ...data
    }
}

export default AppComponent