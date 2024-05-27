const baseURL = 'http://localhost:8081'

async function getData(endpoint: string): Promise<any> {
  const response = await fetch(`${baseURL}/${endpoint}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  return data
}

async function postData(endpoint: string, data: any): Promise<any> {
  const response = await fetch(`${baseURL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const responseData = await response.json()
  return responseData
}

async function putData(endpoint: string, data: any): Promise<any> {
  const response = await fetch(`${baseURL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const responseData = await response.json()
  return responseData
}

async function deleteData(endpoint: string): Promise<string> {
  const response = await fetch(`${baseURL}/${endpoint}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return 'Deleted successfully'
}

export default {
  getData,
  postData,
  putData,
  deleteData
}
