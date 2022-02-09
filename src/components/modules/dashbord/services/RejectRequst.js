import { realTimeDB } from "../../../services/firebase";
import { requestRejectedNotification } from "./email";

export const rejectRequest = async (requestID, user) => {
    // fireStoreDB.collection('users').where("email", "==", `${user.user.email}`)
    //     .get()
    //     .then(snapshot => {
    //         if (!snapshot.empty) {
    //             snapshot.forEach(async (doc) => {
    //                 if (doc.data()) {
    //                     const ref = fireStoreDB.collection("/users").doc(`${doc.id}`);
    //                     await ref.update({
    //                         token: token.token
    //                     }, { merge: true });
    //                 };
    //             });
    //         };
    //     });
    realTimeDB.ref('/request').child(requestID).update({
        rejected: true
    });
    requestRejectedNotification(user.user);
}