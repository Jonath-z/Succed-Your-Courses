import { fireStoreDB,realTimeDB } from "../modules/firebase";
import uuid from "react-uuid";

export const  acceptRequest = (requestID,user) => {
    fireStoreDB.collection('users').where("email", "==", `${user}`)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(async (doc) => {
                    if (!doc.data().accessKey) {
                        const ref = fireStoreDB.collection("/users").doc(`${doc.id}`);
                        await ref.set({
                            accessKey :`${uuid()}`
                        })
                    }
                })
            }
        })
    realTimeDB.ref('/request').child(requestID).remove();
}