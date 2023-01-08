import axios from 'axios';

const API_URL ='/api/v1/connections'


//get connections
const get_connections = async (token) => {
    const response = await axios.get(`${API_URL}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      })

    return response.data
}


//request to connect
const request_connection = async (id, token) => {
    const response = await axios.post(`${API_URL}/connect/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

    return response.data
}


//accept a connection request
const accept_request = async (id, token) => {
    const response = await axios.put(`${API_URL}/accept/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

    return response.data
}

//accept a connection request
const delete_request = async (id, token) => {
    const response = await axios.delete(`${API_URL}/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })

    return response.data
}

const connectionService = {
    get_connections, request_connection,
    accept_request, delete_request
}

export default connectionService