import '../index.css'
import { Link } from "react-router-dom"

const RedirectLogin = () => {
    return (
        <div style={{ display: 'flex',  justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2>Veuillez vous connecter pour accéder à cette page</h2>
                <Link to="/login" className="blue_btn">Se connecter</Link>
            </div>
        </div>
    )
}

export default RedirectLogin
