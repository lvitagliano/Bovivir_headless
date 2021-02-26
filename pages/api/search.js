import { fetchSearch, normalizeSearch } from 'm2-simple-connector/search'
import getGlobalData from './getGlobalData'
import withCaching from 'react-storefront/utils/withCaching'
import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import first from 'lodash/first';
import last from 'lodash/last';
import isEmpty from 'lodash/isEmpty';



async function getPageData(search,filter,sort) {
  filter = filtersToQuery(filter)
  const rawData = await fetchSearch({ search,filter,sort})
  let data = normalizeSearch(rawData)
 
  data={
    ...data,
    sortOptions: get(data, 'sortOptions', [])
    .map((option) => ([{ // split up for ASC/DESC sort for demo
      name: `${get(option, 'name')} ⬇️`,
      code: `${get(option, 'code')}: DESC`,
    }, {
      name: `${get(option, 'name')} ⬆️`,
      code: `${get(option, 'code')}: ASC`,
    }])).flat(),
  }
  return {
    title: `Resultado ${search}`,
    ...data,
    breadcrumbs: [
      {
        text: 'Home',
        href: '/',
      },
    ],
  }
}

function filtersToQuery(filters) {
  const filtersGrouped = groupBy(filters, (x) => x.split(':')[0]);
  const keys = Object.keys(filtersGrouped);
  return keys.map((key) => {
    const values = filtersGrouped[key].map((f) => f.replace(`${key}:`, ''));
    if (key !== 'price') {
      return `${key}: { in: ${JSON.stringify(values)} }`;
    }

    const prices = values.map((x) => x.split('_').map(Number)).flat().sort();
    const from = first(prices);
    const to = last(prices);
    if (!from && !to) {
      return null;
    }
    const fromQuery = from ? `from: "${from}"` : '';
    const toQuery = to ? `to: "${to}"` : '';
    return `
      ${key}: { 
        ${fromQuery}
        ${toQuery}
      }
    `;
  }).filter(Boolean).join('\n');
}

async function search(req, res) {
  const defaultSort = 'position: DESC'; // default sort value on demo
  const { query } = req;
  const { q = '', page = 1 } = query;
  const isSearch = !isEmpty(q);
  let { slug, filters, sort = defaultSort } = query;
  
  if (sort === 'rating') {
    sort = defaultSort; // remove default RSF filter
  }

  if (filters) {
    filters = JSON.parse(filters);
  } else {
    filters = [];
  }

  const result = await fulfillAPIRequest(req, {
    appData: getGlobalData,
    pageData: () => Promise.resolve(isSearch ? getPageData(q,filters,sort) : {}),
  })
  res.json(result)
}

export default withCaching(search, 60 * 60 * 24) // cache with the service worker for 24 hours
