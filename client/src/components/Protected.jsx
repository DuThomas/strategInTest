import RedirectLogin from "./RedirectLogin"

export default function Protected({ children }) {
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