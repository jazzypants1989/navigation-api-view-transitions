import { createElement, lazy, useState } from "react"
import { createRoot } from "react-dom/client"
// import Home from "./pages/Home"
// import Cats from "./pages/Cats"

interface ViewDocument extends Document {
  startViewTransition: (callback: () => void) => void
}

interface NavigateEvent extends Event {
  canIntercept: boolean
  destination: {
    url: string
  }
  intercept: (options: { handler: () => void }) => void
}

const Routes = [
  {
    path: "/",
    component: lazy(() => import("./pages/Home")),
  },
  {
    path: "/cats",
    component: lazy(() => import("./pages/Cats")),
  },
]

const app = document.getElementById("root")

export default function Router({ potentialRoute }: { potentialRoute: string }) {
  if (Routes.find((route) => route.path === potentialRoute)) {
    const Route = Routes.find((route) => route.path === potentialRoute)
    if (!Route) return <Nope />

    return (
      <>
        <Route.component />
      </>
    )
  } else {
    return <Nope />
  }
}

function Nope() {
  return <div>404</div>
}

export function Link(navigateEvent: NavigateEvent) {
  if (!app || !navigateEvent) return
  if (navigateEvent.canIntercept) {
    console.log("local")
    const url = new URL(navigateEvent.destination.url)
    const pathname = url.pathname
    navigateEvent.intercept({
      async handler() {
        ;(document as ViewDocument).startViewTransition(() => {
          createRoot(app).render(
            createElement(Router, { potentialRoute: pathname })
          )
        })
      },
    })
  } else {
    console.log("external")
    return
  }
}
