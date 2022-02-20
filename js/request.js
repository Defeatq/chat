export async function request(method, url, token, body) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    });
  
    return response
  } catch(error) {
    throw new Error(error)
  }
}