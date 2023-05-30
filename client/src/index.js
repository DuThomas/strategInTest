import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App"
import Layout from "./components/Layout"

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Layout>
				<App />
			</Layout>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
)
