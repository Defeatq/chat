export function getCityData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(urlBody => urlBody.json())
      .then(urlContent => {
        checkErrorCode(urlContent.cod) ? resolve(urlContent) : reject(urlContent)
      })
      .catch(() => {
        alert(new Error('Failed to connect').message)
      });
  });
};

export function checkErrorCode(code) {
  switch(code) {
    case 200:
      return true
    case 404:
      return false
    default:
      return new Error('Unrecognized error')
  }
}