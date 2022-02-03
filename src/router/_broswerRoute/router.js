const authRoute = (history) => {
    history.push('/user-authentication');
}

const homeRoute = (history) => {
    history.push('/home');
}

const defaulRoute = (history) => {
    history.push('/');
}

const courseContent = (history,courseID) => {
    history.push(`/module-content/${courseID}`);
}

const browserRoutes = {
    auth: authRoute,
    home: homeRoute,
    defaulRoute: defaulRoute,
    courseContent: courseContent
}
export default browserRoutes;