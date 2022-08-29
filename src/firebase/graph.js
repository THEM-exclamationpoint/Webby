import {app, db} from './db'
import {query, getDocs, collection, where} from 'firebase/firestore'

async function getInterestsOfUser(userId) {
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

async function getUsersByInterest(interestName) {
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

export async function getGraphData(userId) {
  try {
    const username = await getUserById(userId)
    const interests = await getInterestsOfUser(userId)
    let graphData = {
      name: username,
      children: await Promise.all(
        interests.map(async (interest) => {
          const usersWithInterest = await getUsersByInterest(interest)

          const filteredUsersWithInterest = usersWithInterest.filter((user) => {
            return user !== username
          })

          return {
            name: interest,
            children: filteredUsersWithInterest.map((user) => {
              return {
                name: user,
                children: [],
              }
            }),
          }
        })
      ),
    }
    return graphData
  } catch (e) {
    console.error(e)
  }
}
