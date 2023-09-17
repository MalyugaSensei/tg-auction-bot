import { Page as AuctionFormPage }  from "@/pages/auction-form/Page/Page.jsx";

/** @type { import("react-router-dom").RouteObject } */
const router = [
    {
        path: '/auction/form',
        element: <AuctionFormPage />
    }
]

export default router