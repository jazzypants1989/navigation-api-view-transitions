import { createRoot } from "react-dom/client"
import { createElement } from "react"
import Router, { Link } from "./router"

const app = document.getElementById("root")

if (!app) throw new Error("No root element")

const root = createRoot(app)

root.render(createElement(Router, { potentialRoute: window.location.pathname }))

//@ts-ignore
navigation.addEventListener("navigate", Link)
