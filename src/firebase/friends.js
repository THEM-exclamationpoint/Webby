import {app, db} from './db'
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  orderBy,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { getUserData } from './auth'

export async function getUsersFriends(uid) {
  const q = query(
    collection(db, 'junction_user_user'),
    where('friends', 'array-contains', uid)
  )
  const docs = await getDocs(q)
  const friendIds = []
  docs.forEach((doc) => {
    let data = doc.data()
    let friendId
    if (data.friends[0] === uid) friendId = data.friends[1]
    else {
      friendId = data.friends[0]
    }
    friendIds.push(friendId)
  })

    return Promise.all(friendIds.map(async id => {
        const friendQ = query(collection(db, 'users'),where('uid', '==',id))
        let docs = await getDocs(friendQ)
        let friends =[]
        docs.forEach(doc => {
            friends.push(doc.data())
        })
        return friends[0]
    }))
}

export async function getFriendJunctions(uid){
  const q = query(
    collection(db, 'junction_user_user'),
    where('friends', 'array-contains', uid)
  )
  const docs = await getDocs(q)
  let junctions = []
  docs.forEach(doc => {
    junctions.push(doc.data())
  })
  return junctions
}

export async function addFriend(uid1,uid2){
  await addDoc(collection(db,'junction_user_user'), {
    friends: [uid1,uid2],
    id: Date.now() + Math.random().toString(36).slice(2)
  })
}
export async function removeFriend(id){
  try{
    const q = query(collection(db, 'junction_user_user'),where('id','==',id))
    const docs = await getDocs(q)
    let docId
    docs.forEach(doc => {
      docId = doc.id
    })
    const ref = doc(db,'junction_user_user',docId)
    await deleteDoc(ref)
  }
  catch(err){console.error(err)}
}