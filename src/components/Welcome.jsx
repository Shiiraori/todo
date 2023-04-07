import React, { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerInformation, setRegisterInformation] = useState({
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: ""
    });
  
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
  
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigate("/homepage");
        }
      });
    }, []);
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/homepage");
        })
        .catch((err) => alert(err.message));
    };

  
    const handleRegister = () => {
      if (registerInformation.email !== registerInformation.confirmEmail) {
        alert("Please confirm that email are the same");
        return;
      } else if (
        registerInformation.password !== registerInformation.confirmPassword
      ) {
        alert("Please confirm that password are the same");
        return;
      }
      createUserWithEmailAndPassword(
        auth,
        registerInformation.email,
        registerInformation.password
      )
        .then(() => {
          navigate("/homepage");
        })
        .catch((err) => alert(err.message));
    };
  
    const handleGoogleLogin = () => {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };

      return (
        <div className="welcome">
          <h1 className="position-absolute top-0 start-50 translate-middle-x">Todo-List</h1>
          <div className="position-absolute top-50 start-50 translate-middle">
            {isRegistering ? (
              <>
                <h1>Register</h1>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={registerInformation.email}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      email: e.target.value
                    })
                  }
                />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Confirm Email"
                  value={registerInformation.confirmEmail}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      confirmEmail: e.target.value
                    })
                  }
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={registerInformation.password}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      password: e.target.value
                    })
                  }
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={registerInformation.confirmPassword}
                  onChange={(e) =>
                    setRegisterInformation({
                      ...registerInformation,
                      confirmPassword: e.target.value
                    })
                  }
                />
                <button className="sign-in-register-button" onClick={handleRegister}>Register</button>
                <button className="create-account-button" onClick={() => setIsRegistering(false)}>Go back</button>
              </>
            ) : (
              <>
              
                <h1>Log in</h1>
                <input 
                  type="email" 
                  className="form-control"
                  placeholder="Email" 
                  onChange={handleEmailChange} 
                  value={email} />
                <input
                  type="password"
                  className="form-control"
                  onChange={handlePasswordChange}
                  value={password}
                  placeholder="Password"
                />
                <button className="sign-in-register-button" onClick={handleSignIn}>
                  Log in
                </button>
                <button
                  className="create-account-button"
                  onClick={() => setIsRegistering(true)}
                >
                  Create an account
                </button>
                <button onClick={handleGoogleLogin} className="btn btn-primary btn-block mt-3">
                  Sign in with Google
                </button>
                
              </>
            )}
          </div>
        </div>
      );
  }