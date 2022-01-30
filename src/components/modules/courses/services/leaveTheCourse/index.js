import { fireStoreDB } from "../../../../services/firebase"; 
import firebase from "firebase";
import { LocalStorage } from "../../../../helper/localStorage";

/////////////////////// UPDATE THE DB /////////////////////
const update = (snapshot,courseID) => {
    snapshot.forEach(async (doc) => {
        // console.log(doc.id);
        const ref = fireStoreDB.collection("/users").doc(`${doc.id}`);
        if (doc.data().courses && doc.data().courses.indexOf(`${courseID}`) !== -1) {
            await ref.update({
                courses: firebase.firestore.FieldValue.arrayRemove(`${courseID}`)
            });
        }
    });
}

//////////////////// UPDATE LOCALSTORAGE /////////////////////
export const deleteInLocalStorage = (courseID) => {
    const user = JSON.parse(LocalStorage.get('userData'));
    console.log('courseData', user);
    for (let i = 0; i < user.courses.length; i++){
        console.log(user.courses[i],'courseID')
        if (courseID === user.courses[i]) {
            user.courses.splice(i, 1);
            console.log('updated after deletion', user);
            LocalStorage.set('userData', JSON.stringify(user));
            return JSON.parse(LocalStorage.get('userData'));
        }
    }
}

const leaveCourse = (courseID, userID) => {
    fireStoreDB.collection("/users").where("id", "==", `${userID}`)
        .get()
        .then((snapshot) => {
            update(snapshot, courseID);
        });
    console.log(courseID);
}

export default leaveCourse;
