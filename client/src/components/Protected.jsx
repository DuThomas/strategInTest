import RedirectLogin from "./RedirectLogin"

const Protected = ({ children }) => {
    if (localStorage.getItem("token")) {
        return (
            <div >
                <main>{children}</main>
            </div>
        )
    }
    else {
        return (
            <RedirectLogin />
        )
    }
}

export default Protected