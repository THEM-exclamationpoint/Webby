import {app, db} from './db'
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  orderBy,
} from 'firebase/firestore'

export async function getUsersFriends(uid){
    const q = query(collection(db, 'junction_user_user'), where('friends','array-contains',uid))
    const docs = await getDocs(q)
    const friendIds =[]
    docs.forEach((doc) =>{
        let data = doc.data()
        let friendId 
        if(data.friends[0] === uid) friendId = data.friends[1]
        else {
            friendId = data.friends[0]
        }
        friendIds.push(friendId)
    })

    let friends = [];
    friendIds.forEach(async id => {
        const friendQ = query(collection(db, 'users'),where('uid', '==',id))
        let docs = await getDocs(friendQ)
        docs.forEach(doc => {
            friends.push(doc.data())
        })
    })
    return friends
}