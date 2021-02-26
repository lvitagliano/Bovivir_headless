import axios from 'axios'

let URI = ''

if (typeof window !== 'undefined') URI = location.protocol + '//' + location.host

export const setState = state => axios.post(`${URI}/redis/setState`, state)

export const delState = () => axios.post(`${URI}/redis/delState`)
