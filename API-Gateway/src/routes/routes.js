export const Routes = [
    {
        route: "/auth",
        target: "http://localhost:3000/api/v1/auth/public",
        name: 'Auth-service',
        authrequired: false
    },
    {
        route: "/authenticated",
        target: "http://localhost:3000/api/v1/auth/protected",
        name: 'Auth-service',
        authrequired: true
    },
    {
        route: "/authenticated/usertype",
        target: "http://localhost:3000/api/v1/auth/types",
        name: 'Auth-service',
        authrequired: true   
    },
    {
        route: "/wallet",
        target: "http://localhost:3000/api/v1/wallet",
        name: 'Wallet-service',
        authrequired: true 
    },
    {
        route: "/wallet-type",
        target: "http://localhost:3000/api/v1/wallet-type",
        name: 'Wallet-service',
        authrequired: true 
    },
    {
        route: "/itrans",
        target: "http://localhost:3000/api/v1/iTransaction",
        name: 'Wallet-service',
        authrequired: true 
    },
    {
        route: "/etrans",
        target: "http://localhost:3000/api/v1/eTransaction",
        name: 'Wallet-service',
        authrequired: true 
    }

]