import {app, db} from './db'
import {getUserData, auth} from './auth';
import {query, getDocs, collection, where, addDoc, orderBy} from 'firebase/firestore'


export async function getListOfGroups() {
  try {
    const user = auth.currentUser;
    const q = query(collection(db, 'groups'), where('members', 'array-contains', user.uid));
    const docs = await getDocs(q);
    return docs;
  }
  catch(err) { console.error(err) };
}

export async function getMessagesWithGroup(groupId) {
try {
  const q = query(collection(db, 'messages'), where('toGroup','==', groupId), orderBy('timeStamp', 'desc'));
  const docs = await getDocs(q);
  return docs;
}
catch(err) {console.error(err)}
}

export async function sendNewMessage(groupId, content) {
  try {
    const user = auth.currentUser;
    await addDoc(collection(db, 'messages'), {
      content,
      fromUser: user.uid,
      toGroup: groupId,
    });
  }
  catch (err) { console.error(err) }
}
