import axios from 'axios';

const API_URL ='/api/v1/itineraries'

// create Itinerary

const add_itinerary = async (data, token) => {
    const response = await axios.post(`${API_URL}/`, data, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })

    return response.data
}

// update Itinerary
const update_itinerary = async (id, data, token) => {
    const response = await axios.put(`${API_URL}/update/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })

    return response.data
}

// search Itinerary
const search_itinerary = async(data, token) => {
    const response = await axios.get(`${API_URL}/search`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
        params: data
      })

    return response.data.search_results
}

// delete Itinerary
const delete_itinerary = async (id,token) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })

  return response.data
}

const itineraryService = {
    add_itinerary, update_itinerary, search_itinerary, delete_itinerary
}

export default itineraryService