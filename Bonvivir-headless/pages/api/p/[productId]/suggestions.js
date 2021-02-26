import { productSuggestions } from 'm2-simple-connector/product';


export default async function(req, res) {
  const { productId } = req.query
  res.json(await productSuggestions({id:productId}, req, res))
}
