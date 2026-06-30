import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://4.224.186.213/evaluation-service/',
  timeout: 10000
})

const getToken = async () => {
  const storedToken = localStorage.getItem('accessToken')

  if (storedToken) {
    return storedToken
  }

  try {
    const response = await axiosInstance.post('auth', {
        email:'yogeshvenugopal_23csb62@kgkite.ac.in',
        name:'Yogesh venugopal R',
        rollNo:'23CSB62',
        accessCode:'WjNyCT',
        clientID:'d68c4113-44f0-49f1-9943-2953a59c234a',
        clientSecret:'HnbJHFnCjTDfQcDg'
    })

    const token = response.data?.accessToken || response.data?.access_token

    if (token) {
      localStorage.setItem('accessToken', token)
    }

    return token
  } catch (error) {
    console.error('Failed to get auth token:', error)
    return null
  }
}

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default axiosInstance