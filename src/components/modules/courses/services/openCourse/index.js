import browserRoutes from "../../../../../router/_broswerRoute/router";

const verifyToken = async (user,courseID,history) => {
    console.log(user);
    const verifyToken = await fetch('http://localhost:3000/api/v1/verifyToken', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            token: user.token
        })
    });
    
    const response = await verifyToken.json();
    console.log(response);

    if (response.experied) {
        alert(`You don't have access to the module, update your payement plan`);
    }
    else {
        
    }
    browserRoutes.courseContent(history, courseID);
}

export default verifyToken;