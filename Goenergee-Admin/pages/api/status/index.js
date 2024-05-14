import axios from 'axios'
const baseUrl = process.env.NEXT_APP_API    

export const fetchInitiatedRequest = async (req, res) => {
    const request = await axios.get(`${baseUrl}/request`)
    return request.data
}


export const getAllTransactions = async (req, res) => {
    const request = await axios.get(`${baseUrl}/request`)
    return request.data
}



export const getAllTransacti = async (req, res) => {
    const request = await axios.get(`${baseUrl}/request`)
    return request.data
}
