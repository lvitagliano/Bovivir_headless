import { session } from 'm2-simple-connector'

export default async function(req, res) {
  res.json(await session(req, res))
}
