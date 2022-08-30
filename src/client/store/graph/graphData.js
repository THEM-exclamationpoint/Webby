import {getGraphData} from '../../../firebase/graph'

/* ACTION TYPES */

const GET_GRAPH_DATA = 'GET_GRAPH_DATA'

/* ACTION CREATORS */

const _GET_GRAPH_DATA = (graphData) => {
  return {
    type: GET_GRAPH_DATA,
    graphData,
  }
}

/* THUNK CREATORS */

export const _getGraphData = (userId) => {
  return async (dispatch) => {
    const graphData = await getGraphData(userId)
    dispatch(_GET_GRAPH_DATA(graphData))
  }
}

/* REDUCER */

export default function (state = {}, action) {
  switch (action.type) {
    case GET_GRAPH_DATA:
      return action.graphData
    default:
      return state
  }
}
