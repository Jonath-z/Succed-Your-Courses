import { fireStoreDB } from "../../../modules/firebase"; 
import firebase from "firebase";

const upadate = (snapshot,courseID) => {
    snapshot.forEach(async (doc) => {
        console.log(doc.id);
        const ref = fireStoreDB.collection("/users").doc(`${doc.id}`);
        if (doc.data().courses && doc.data().courses.indexOf(`${courseID}`) === -1) {
            await ref.set({
                courses: firebase.firestore.FieldValue.arrayUnion(`${courseID}`)
            }, { merge: true });
        }
    });
}

const enrollTheCourse = (courseID, userID) => {
    fireStoreDB.collection("/users").where("id", "==", `${userID}`)
        .get()
        .then((snapshot) => {
            upadate(snapshot, courseID);
        });
}

export default enrollTheCourse;
