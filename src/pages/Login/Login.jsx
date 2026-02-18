import { useState } from "react";
import "./Login.css"
import nhmLogo from '../../../src/assets/natural-history-outline.png';
import nhmOutsideWebp from '../../../src/assets/nhm-outside.webp?url';
import flowers from '../../assets/heart-flower.svg';
import { User, Lock, Eye, EyeOff } from "lucide-react";

const UserIcon = () => <User size={18} />;
const LockIcon = () => <Lock size={18} />;
const EyeIcon = () => <Eye size={18} />;
const EyeOffIcon = () => <EyeOff size={18} />;

export default function Login() {
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);



      const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const res = await fetch("/.netlify/functions/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, surname, password, rememberMe }),
        });

        if (res.ok) {
            // Cookie is set by the function; just go to RSVP page
            window.location.href = "/";
        } else {
            setError("Invalid username or password");
        }
    }

    function RememberMeToggle({ value, onChange }) {
  return (
    <label className="rememberRow">
      <p>Remember me</p>

      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />

      <span className="toggle" />
    </label>
  );
}

    return (

        <div className="loginBody">

            <div className="loginImageWrapper">
                <img className="loginHeroImage" src={nhmOutsideWebp} alt="Natural History Museum" loading="lazy" />
                <div className="loginImageOverlay"></div>
            </div>

            <div className="loginFormSection">
                <header className="header">
                    <img className = "flowers" src={flowers} alt="flower-motif" />
                    <div className = "headerText">
                        <h2>Login</h2>
                    </div>
                        
                </header>
                           

                <p>Please sign in using any full name given on your invite.</p>

                <form onSubmit={handleSubmit} className="loginForm">

                    <div className="inputWrapper">
                        <span className="inputIcon">
                            <UserIcon />
                        </span>

                    <input className="single-line-input-login"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}

                    />
                    </div>

                    <div className="inputWrapper">
                        <span className="inputIcon">
                            <UserIcon />
                        </span>

                    <input className="single-line-input-login"
                        placeholder="Surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}

                    />
                    </div>

                    <div className="inputWrapper">
                        <span className="inputIcon">
                            <LockIcon />
                        </span>

                    <input
                        className="single-line-input-login"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />

                        <button
                            type="button"
                            className="inputAction"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                        </div>
                    




                    <div className="additionalInput">
                        <RememberMeToggle
                            value={rememberMe}
                            onChange={setRememberMe}
                            />

                    </div>


                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <button type="submit" className="primary-button" >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
