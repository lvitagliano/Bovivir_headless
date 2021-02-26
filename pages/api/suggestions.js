import { searchSuggestions } from 'm2-simple-connector/search'

export default async function searchSuggestionsPage(req, res) {
  const { q } = req.query
  res.json(await searchSuggestions(q, req, res))
}
