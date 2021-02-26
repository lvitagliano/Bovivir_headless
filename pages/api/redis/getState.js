const redis = require('../../../redis')

export async function getStore(userSessionId) {
  if (userSessionId) return await redis.getState(userSessionId)
  else return {}
}
