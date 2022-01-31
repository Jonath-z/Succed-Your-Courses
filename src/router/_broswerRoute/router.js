const authRoute = (history) => {
    history.push('/user-authentication');
}

const homeRoute = (history) => {
    history.push('/home');
}

const defaulRoute = (history) => {
    history.push('/');
}

const browserRoutes = {
    auth: authRoute,
    home: homeRoute,
    defaulRoute: defaulRoute
}
export default browserRoutes;