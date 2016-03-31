import R from 'ramda'
import { joinMessage, leftMessage } from './actions/messages'

let diffCmp = (x, y) => x.id === y.id

let userDiff = (nextState, prevState, dispatch) => {
  let diff = {
    joined: R.differenceWith(diffCmp, nextState, prevState),
    left: R.differenceWith(diffCmp, prevState, nextState),
  }

  console.log("DIFF", diff)

  if (diff.joined.length) {
    dispatch(joinMessage(diff.joined))
  }
  if (diff.left.length) {
    dispatch(leftMessage(diff.left))
  }
}

export default userDiff
