import { fireStoreDB,realTimeDB } from "../../../services/firebase";
// import uuid from "react-uuid";

export const acceptRequest = async (requestID, user) => {
    
    const requestToken = await fetch('http://localhost:3000/api/v1/getToken', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            name: user.user.name,
            email: user.user.email,
            userID: user.id
        })
    })
    const token = await requestToken.json();

    console.log(token);
    
    fireStoreDB.collection('users').where("email", "==", `${user.user.email}`)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(async (doc) => {
                    if (doc.data()) {
                        const ref = fireStoreDB.collection("/users").doc(`${doc.id}`);
                        await ref.set({
                            token: token.token
                        }, { merge: true });
                    };
                });
            };
        });
    realTimeDB.ref('/request').child(requestID).remove();
}