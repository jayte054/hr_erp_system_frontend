import { useNavigate } from "react-router-dom";
import "./landingPage.css";



export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landingPage">
            <h2>Welcome To Justin's HR ERP LANDING SYSTEM</h2>
            <button 
                style={{background: "linear-gradient(to right, #28a745, #a1a178) ",
            }}
                onClick={
                    () => navigate("./authentication")
                }
            >
                Get Started
            </button>
        </div>
    )
}