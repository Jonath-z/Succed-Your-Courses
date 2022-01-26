import firebase, { fireStoreDB } from "../../../services/firebase";

const addModules = (
    course, fileUrl,
    description,
    setOptionName,
    setOptionUrl
) => {
    fireStoreDB.collection('module-doc').where('moduleID', '==', course.id)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                fireStoreDB.collection('module-doc').add({
                    moduleID: `${course.id}`,
                    moduleName: `${course.module}`,
                    class: `${course.class}`,
                    option:
                        [{
                            file: `${fileUrl}`,
                            description: `${description}`
                        }]
                });
            }
            else {
                snapshot.forEach(async (doc) => {
                    const ref = fireStoreDB.collection('/module-doc').doc(`${doc.id}`);
                    if (doc.data().option) {
                        await ref.set({
                            option: firebase.firestore.FieldValue.arrayUnion({
                                file: `${fileUrl}`,
                                description: `${description}`
                            })
                        }, { merge: true });
                    }
                });
            }
        });
    setOptionName('');
    setOptionUrl('');
}

export default addModules;