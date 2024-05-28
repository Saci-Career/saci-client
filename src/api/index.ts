const baseURL = 'http://localhost:8081'

async function fetchData(endpoint: string, options: RequestInit = {}): Promise<any> {
  const response = await fetch(`${baseURL}/${endpoint}`, options)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

async function getData(endpoint: string): Promise<any> {
  return fetchData(endpoint)
}

async function postData(endpoint: string, data: any): Promise<any> {
  return fetchData(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

async function putData(endpoint: string, data: any): Promise<any> {
  return fetchData(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

async function deleteData(endpoint: string): Promise<string> {
  await fetchData(endpoint, {
    method: 'DELETE'
  })
  return 'Deleted successfully'
}

export default {
  getData,
  postData,
  putData,
  deleteData
}
