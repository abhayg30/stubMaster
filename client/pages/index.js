import axios from "axios";
import BuildClient from "../api/build-client";

//we could use any hook inside a component not inside initialProps hence we are using axios

const LandingPage = ({ currentUser }) => {
    return currentUser ? <h1>You are singed in</h1> : <h1>You are NOT signed in</h1>
}
//server makes request
LandingPage.getInitialProps = async (context) => {
  const client = BuildClient(context)
  const { data } = await client.get('/api/users/currentuser');
  return data;
}

export default LandingPage;


