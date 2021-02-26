import buildApi from './api';

const createApi = () => {
  const { setBaseURL, get, post, patch } = buildApi('');
  const URL_API = `/`;
  setBaseURL(URL_API);

  return {
    getSample: (params, config = {}) => get('api', params, config),
    getSelections: (config = {}) => get('api/selections', config),
    getAcceptedPaymentMethods: (promotionId, config = {}) =>
      get(`api/Promotions/GetAcceptedPaymentMethods/${promotionId}`, config),
    postLead: (data, config = {}) => post('api/leads', data, config),
    postCLNCardNumberToValidate: (data, config = {}) =>
      post('api/CLN/validateCardNumber', data, config),
    postAddressToStandardize: (data, config = {}) =>
      post('api/address/standardize', data, config),
    postSubscription: (data, config = {}) =>
      post('api/subscription', data, config),
    getOffers: (config = {}) => get('api/offers', config),
    newOffer: (data, config = {}) => post('api/offers', data, config),
    deleteOffer: (data, config = {}) => post('api/offers/delete', data, config),
    editOffer: (data, config = {}) => post('api/offers/edit', data, config),
    editItem: (data, config = {}) => post('api/offeritems/edit', data, config),
    newItem: (data, config = {}) => post('api/offeritems', data, config),
    deleteItem: (data, config = {}) =>
      post('api/offeritems/delete', data, config),
    saveLeadStep: (data, config = {}) => post('api/leads/save', data, config),
    login: (user, config = {}) =>
      post('api/authentication/login', user, config),
    isAuthenticated: (user, config = {}) =>
      get('api/authentication/IsAuthenticated', user, config),
    getSubscriptionsWithError: (data, config = {}) =>
      post('api/errorsubscription', data, config),
    exportToExcel: (params, config = { responseType: 'arraybuffer' }) =>
      get(`api/errorSubscription/exportToExcel`, params, config),
    getTotalSubscriptionsWithError: (data, config = {}) =>
      post('api/errorsubscription', data, config),
    getContactInfo: (dni, config) =>
      get(`api/Contact/GetContact/${dni}`, config),
    postContactInfo: (data, config) =>
      post('api/Contact/Create', data, config),
    postReference: (data, config) =>
      post('/api/ReferFriend/reference', data, config),
    getOrders: (id, config) =>
      get(`api/Order/Get/${id}`, config),
    getLegalDocument: (orderId, config) =>
      get(`api/LegalDocument/Get/${orderId}`, config),
    getInvoice: (id, year, config) =>
      get(`api/Invoice/Get/year/${year}/${id}`, config),
    patchSubscriptionCreditCard: (data, config) =>
      patch('api/subscription/creditcard', data, config),
    patchSubscriptionAddress: (data, config) =>
      patch('api/subscription/address', data, config),
    suspension: (data, config) =>
      post(`api/subscription/suspension/`, data, config),
    suspend: (data, config) =>
      post(`api/subscription/suspend/`, data, config),
    getSuspensionStatus: (id, config) =>
      get(`api/subscription/${id}/suspension`, config),
  };
};

export default createApi;
