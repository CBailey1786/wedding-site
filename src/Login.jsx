import { useState } from "react";
import "./Login.css"
import nhmLogo from '../src/assets/natural-history-outline.png';
import nhmOutsideWebp from '../src/assets/nhm-outside.webp?url';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const res = await fetch("/.netlify/functions/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, rememberMe }),
        });

        if (res.ok) {
            // Cookie is set by the function; just go to RSVP page
            window.location.href = "/";
        } else {
            setError("Invalid username or password");
        }
    }

    return (

        <div className="pageBody">


            <div className="loginBox" >

                <div className="leftContent">

                    <img className="heroImage" src={nhmOutsideWebp} alt="Natural History Museum" loading="lazy" />

                </div>


                <div className="rightContent">

                    <img className="nhmLogo" src={nhmLogo} alt="natural history museum outline" />

                    <div className="namesSectionLogin">
                        <h1 className="names">Amanda </h1> <h2 className="namesAnd">and</h2> <h1 className="names"> Cameron</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="loginForm">
                        <label className="inputGroup">
                            Username
                            <input className="loginInput"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}

                            />
                        </label>

                        <label className="inputGroup">
                            Password

                            <input
                                className="loginInput"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />

                        </label>

                        <div className="additionalInput">
                            <label>
                                <input type="checkbox" name="rememberMe" id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)} />
                                Remember me
                            </label>

                            <div>Forgotten login?</div>

                        </div>


                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <button type="submit" className="loginButton" >
                            Login
                        </button>
                    </form>


                </div>


            </div>
        </div>
    );
}
