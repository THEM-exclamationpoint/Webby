import { getFriendJunctions, addFriend, removeFriend } from "../../../firebase/friends"

/**
 * ACTION TYPES
 */
 const GET_JUNCTIONS = 'GET_JUNCTIONS'

 
 /**
  * ACTION CREATORS
  */
 const setJunctions = (junctions) => {
   return {
     type: GET_JUNCTIONS,
     junctions,
   }
 }
 
 /**
  * THUNK CREATORS
  */
 export const getJunctions = (uid) => {
     return async (dispatch) => {
       try {
       let junctions = await getFriendJunctions(uid)
       dispatch(setJunctions(junctions))}
       catch(err){
         console.error(err)
       }
     }
 }
 export const addAFriend = (uid1,uid2) => {
    return async (dispatch) => {
      try {
        await addFriend(uid1,uid2)
      let junctions = await getFriendJunctions(uid1)
      dispatch(setJunctions(junctions))}
      catch(err){
        console.error(err)
      }
    }
}
export const deleteFriend = (id,uid) => {
    return async (dispatch) => {
      try {
        await removeFriend(id)
      let junctions = await getFriendJunctions(uid)
      dispatch(setJunctions(junctions))}
      catch(err){
        console.error(err)
      }
    }
}

 
 /**
  * REDUCER
  */
 export default function (state = [], action) {
   switch (action.type) {
     case GET_JUNCTIONS:
       return action.junctions
     default:
       return state
   }
 }