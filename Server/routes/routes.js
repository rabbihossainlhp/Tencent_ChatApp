const userRouer = require('./user.route');



const router_array = [
    {
        path:"/api/user",
        handler:userRouer,
    }
]



const useRoutes = (app) =>{
    router_array.map(singleRoute =>{
        app.use(singleRoute.path,singleRoute.handler);
    })
}



module.exports = useRoutes;