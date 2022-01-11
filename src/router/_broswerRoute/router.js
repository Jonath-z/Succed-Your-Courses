const authRoute = (history) => {
    history.push('/user-authentication');
}


const browserRoutes = {
    auth : authRoute,
}
export default browserRoutes;