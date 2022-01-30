import { fireStoreDB } from "../../../../services/firebase"; 
import firebase from "firebase";
import { LocalStorage } from "../../../../helper/localStorage";

////////////// UPDATE ENROLLED COURSE IN DB ///////////////////////
const update = (snapshot,courseID) => {
    snapshot.forEach(async (doc) => {
        // console.log(doc.id);
        const ref = fireStoreDB.collection("/users").doc(`${doc.id}`);
        if (doc.data().courses && doc.data().courses.indexOf(`${courseID}`) === -1) {
            await ref.update({
                courses: firebase.firestore.FieldValue.arrayUnion(`${courseID}`)
            }, { merge: true });
        }
    });
}

//////////////// UPDATE ENROLLED COURSE IN LOCALSTORAGE //////////////
export const updateLocalStorage = (courseID) => {
    const user = JSON.parse(LocalStorage.get('userData'));
    user.courses.push(courseID);
    console.log('courses updated', user);
    LocalStorage.set('userData', JSON.stringify(user));
    return JSON.parse(LocalStorage.get('userData'));
}

const enrollCourse = (courseID, userID) => {
    fireStoreDB.collection("/users").where("id", "==", `${userID}`)
        .get()
        .then((snapshot) => {
            update(snapshot, courseID);
        });
}

export default enrollCourse;
