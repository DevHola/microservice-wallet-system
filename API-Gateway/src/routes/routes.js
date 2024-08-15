export const Routes = [
    {
        route: "/auth",
        target: "http://localhost:3000/api/auth/public",
        authrequired: false
    },
    {
        route: "/auth",
        target: "http://localhost:3000/api/auth/protected",
        authrequired: true
    }
]