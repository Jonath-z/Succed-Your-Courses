import { fireStoreDB } from "../../../../services/firebase"; 
import firebase from "firebase";

const update = (snapshot,courseID) => {
    snapshot.forEach(async (doc) => {
        console.log(doc.id);
        const ref = fireStoreDB.collection("/users").doc(`${doc.id}`);
        if (doc.data().courses && doc.data().courses.indexOf(`${courseID}`) === -1) {
            await ref.update({
                courses: firebase.firestore.FieldValue.arrayUnion(`${courseID}`)
            }, { merge: true });
        }
    });
}

const enrollTheCourse = (courseID, userID) => {
    fireStoreDB.collection("/users").where("id", "==", `${userID}`)
        .get()
        .then((snapshot) => {
            update(snapshot, courseID);
        });
}

export default enrollTheCourse;
