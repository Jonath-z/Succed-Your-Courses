import { getToken } from "../../../../router/_API-Route";
import { fireStoreDB, realTimeDB } from "../../../services/firebase";
import { requestAcceptedNotification} from "./email";

export const acceptRequest = async (requestID, user) => {
    
    const requestToken = await fetch(getToken, {
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

    // console.log(token);
    
    fireStoreDB.collection('users').where("email", "==", `${user.user.email}`)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(async (doc) => {
                    if (doc.data()) {
                        const ref = fireStoreDB.collection("/users").doc(`${doc.id}`);
                        await ref.update({
                            token: token.token
                        }, { merge: true });
                    };
                });
            };
        });
    realTimeDB.ref('/request').child(requestID).update({
        rejected: false
    });
    requestAcceptedNotification(user.user);
}