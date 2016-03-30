export const PRESENCE_SYNC = 'PRESENCE_SYNC'
export const PRESENCE_DIFF = 'PRESENCE_DIFF'

export function presenceState(state) {
  return {
    type: PRESENCE_SYNC,
    state
  }
}

export function presenceDiff(state) {
  return {
    type: PRESENCE_DIFF,
    state
  }
}
