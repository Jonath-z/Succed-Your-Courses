import { realTimeDB, fireStoreDB } from "../../../services/firebase";


const DeleteModuleFromRealTimeDB = (courseID) => {
    realTimeDB.ref('/modules').child(courseID).remove();
}

const DeleteModuleFormUserCollectionfireStoreDB = (courseID) => {
    fireStoreDB.collection('users')
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    if (doc.data().courses.indexOf(courseID !== -1)) {
                        doc.data().courses.filter((id) => id !== courseID );
                        fireStoreDB.collection('users').add(doc.data());
                    }
                })
            }
        });
}

const DeleteModuleDocumentFromFireStore = (courseID) => {
    fireStoreDB.collection('module-doc').where("moduleID", "==", `${courseID}`)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    doc.ref.delete();
                })
            }
        });
}

const deleteCourse = (courseID) => {
    DeleteModuleDocumentFromFireStore(courseID);
    DeleteModuleFormUserCollectionfireStoreDB(courseID)
    DeleteModuleFromRealTimeDB(courseID);
}

export default deleteCourse;