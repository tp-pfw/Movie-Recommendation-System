import React, {useState} from 'react';
import Loginform from './Loginform';
import Displaymovies from './Displaymovies';

//Main function
 // On successful login, the user sees the Display Movies Page,
  // or sees the Login Page with the alert "Enter Valid Credentials"
function App() {

  const adminUser ={
    email:"admin@admin.com",
    password: "admin123"
  }
  const user1 ={
    email:"anne@gmail.com",
    password: "anne123"
  }

  const [user, setUser] = useState({name: "", email:""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);
    if ((details.email === adminUser.email && details.password === adminUser.password) || (details.email === user1.email && details.password === user1.password))
    {
      console.log("Logged In");
      setUser({
        name: details.name,
        email: details.email
      });
    }
    else
    console.log("Enter Valid Credentials");
    setError("Enter Valid Credentials");

  }

  const Logout = () => {
    console.log("Logout");
    setUser({
      name: "",
      email:""
    });
  }


  return (
    <div className="App">
      <br></br>
      <div className='title'> AI Based Movie Recommendation System</div>
      <br></br>
      <div className ='pfwlogo'> </div>
      <br></br>
      <div className='details'>
        <h2> CS 56000-02 Software Engineering</h2>
        <h3> Instructor: Dr. Venkata Inukollu </h3>
      </div> 
      <br></br>
      
      {(user.email !== "") ? (
        <div className='logout'>
          <Displaymovies/>
          <br></br>
          <button onClick={Logout}>Logout </button>
        </div>
      ) : (
      
        <div className="loginpage">
        <Loginform Login = {Login} error = {error}></Loginform></div>
      )
      }
    
    <div className='groupdetails'>
    <br></br>
        <h4> Group 2: </h4>
        <h4>  - Dhanusha Mallavajjala - Rakshya Aryal</h4>
        <h4> - Pragna Mallikarjuna Swamy  - Tanmaya Prakash</h4>
      </div>
      <div className='blank'></div>
         
  </div>
  
  );
}

export default App;
