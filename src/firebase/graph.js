import {app, db} from './db'
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  orderBy,
} from 'firebase/firestore'

export async function getInterestsOfUser(userId) {
  try {
    const q = query(
      collection(db, 'junction_user_interest'),
      where('uid', '==', userId)
    )
    const docs = await getDocs(q)
    let interestIds = []

    if (docs) {
      docs.forEach((doc) => {
        interestIds.push(doc.data().interestId)
      })
    }
    const interestNames = await Promise.all(
      interestIds.map(async (interestId) => await getInterestById(interestId))
    )
    return interestNames
  } catch (e) {
    console.error(e)
  }
}

async function getInterestById(interestId) {
  try {
    const q = query(
      collection(db, 'interests'),
      where('interestId', '==', interestId)
    )
    const docs = await getDocs(q)
    let interestName
    docs.forEach((doc) => (interestName = doc.data().interest))
    return interestName
  } catch (e) {
    console.error(e)
  }
}

async function getInterestId(interestName) {
  try {
    const q = query(
      collection(db, 'interests'),
      where('interest', '==', interestName)
    )
    const docs = await getDocs(q)
    let interestId

    docs.forEach((doc) => (interestId = doc.data().interestId))
    return interestId
  } catch (e) {
    console.error(e)
  }
}

export async function getUsersByInterest(interestName) {
  try {
    const interestId = await getInterestId(interestName)

    const q = query(
      collection(db, 'junction_user_interest'),
      where('interestId', '==', interestId)
    )
    const docs = await getDocs(q)
    let userIds = []

    if (docs) {
      docs.forEach((doc) => {
        userIds.push(doc.data().uid)
      })
    }
    const users = await Promise.all(
      userIds.map(async (userId) => await getUserById(userId))
    )
    return users
  } catch (e) {
    console.error(e)
  }
}

async function getUserById(userId) {
  try {
    const q = query(collection(db, 'users'), where('uid', '==', userId))
    const docs = await getDocs(q)
    let user
    docs.forEach((doc) => (user = doc.data().name))
    return user
  } catch (e) {
    console.error(e)
  }
}
