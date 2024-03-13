import Axios from 'axios'

const trelloBaseUrl = import.meta.env.VITE_TRELLO_BASE_URL
const token = import.meta.env.VITE_TOKEN
const key = import.meta.env.VITE_KEY

let axios = document.axios

if (!document.axios) {
    document.axios = Axios.create()
    document.axios.defaults.baseURL = trelloBaseUrl
    document.axios.defaults.params = {
        token,
        key
    }
    axios = document.axios
}

export { axios }
