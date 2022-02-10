import { verifyToken as verifyTokenRoute } from "../../../../../router/_API-Route";

const verifyToken = async (user) => {
    // console.log(user);
    const verifyToken = await fetch(verifyTokenRoute, {
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
    // console.log(response);

    if (response.experied) {
        // alert(`You don't have access to the module, update your payement plan`);
        return response.experied;
    }
    else {
        return response.experied;
    }
}

export default verifyToken;