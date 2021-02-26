import { isCancel, CancelToken } from 'apisauce'

import createApi from '../bonvivirApi'

const bonvivirApi = createApi()

export { CancelToken, isCancel, bonvivirApi }
