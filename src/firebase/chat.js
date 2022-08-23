// find every person logged in user has ongoing chats with. we have a messages collection where each message is a document containing the to, from, content, and date
// when logged in user selects a specific chat, query for all the messages between that user and loggin in user.
// when a message is sent, add to messages collection in db, this will automatically populate it onto the browser (ideally)

import {app, db} from './db'

import {getUserData} from './auth';

import {query, getDocs, collection, where, addDoc, orderBy} from 'firebase/firestore'

const auth = getAuth(app);

export async function getListOfMessages() {
  try {
    const user = auth.currentUser;
    const q = query(collection(db, 'groups'), where('members', 'array-contains', user.uid));
    const docs = await getDocs(q);
    return docs;
  }
  catch(err) { console.error(err) };
}
export function getMessagesWithGroup(groupId) {
try {
  const q = query(collection(db, 'messages'), where('toGroup','==', groupId), orderBy('timeStamp', 'desc'));
  const docs = await getDocs(q);
  return docs;
}
catch(err) {console.error(err)}
}

export function sendNewMessage(groupId, content) {
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
