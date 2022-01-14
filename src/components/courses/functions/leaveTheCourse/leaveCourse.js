import { fireStoreDB } from "../../../modules/firebase"; 
import firebase from "firebase";

const update = (snapshot,courseID) => {
    snapshot.forEach(async (doc) => {
        console.log(doc.id);
        const ref = fireStoreDB.collection("/users").doc(`${doc.id}`);
        if (doc.data().courses && doc.data().courses.indexOf(`${courseID}`) !== -1) {
            await ref.update({
                courses: firebase.firestore.FieldValue.arrayRemove(`${courseID}`)
            });
        }
    });
}

const leaveCourse = (courseID, userID) => {
    fireStoreDB.collection("/users").where("id", "==", `${userID}`)
        .get()
        .then((snapshot) => {
            update(snapshot, courseID);
        });
}

export default leaveCourse;
