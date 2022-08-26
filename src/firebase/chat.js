import {app, db} from './db'
import {getUserData, auth} from './auth'
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore'

export async function getListOfGroups() {
  try {
    const user = auth.currentUser
    const q = query(
      collection(db, 'groups'),
      where('members', 'array-contains', user.uid)
    )
    const docs = await getDocs(q)
    if (docs) {
      let groups = []
      docs.forEach((doc) => {
        groups.push(doc.data())
      })
      return groups
    }
    return null
  } catch (err) {
    console.error(err)
  }
}

export async function getMessagesWithGroup(groupId) {
  try {
    // snapshot
    const q = query(
      collection(db, 'messages'),
      where('toGroup', '==', groupId),
      orderBy('timeStamp', 'asc')
    )
    const docs = await getDocs(q)
    if (docs) {
      const messages = []
      docs.forEach((doc) => {
        messages.push(doc.data())
      })
      return messages
    }
    return null
  } catch (err) {
    console.error(err)
  }
}

export async function sendNewMessage(uid,groupId, content) {
  try {
    await addDoc(collection(db, 'messages'), {
      content,
      fromUser: uid,
      toGroup: groupId,
      timeStamp: serverTimestamp()
    })
  } catch (err) {
    console.error(err)
  }
}
