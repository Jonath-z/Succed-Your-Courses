const authRoute = (history) => {
    history.push('/user-authentication');
}

const homeRoute = (history) => {
    history.push('/home');
}


const browserRoutes = {
    auth: authRoute,
    home: homeRoute
}
export default browserRoutes;