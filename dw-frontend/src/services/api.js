/**
 * @method api
 * @description Function to handle fetch accross the app.
 * @param {*} URL 
 * @param {*} requestInfo 
 * @returns Fetch Response {object-JSON}
 */
const api = async (URL, requestInfo) => {
  return new Promise((resolve, reject) => {
    fetch(URL, requestInfo)
        .then(response => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json().then(text => {
                    console.error(text);
                });
            };
        })
        .catch(error => { reject(error) })
});
};

export default api;
