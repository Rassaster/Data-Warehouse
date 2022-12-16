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
                console.log(response)
                if (response.status === 204) {
                    return resolve(response)
                } else {
                    return resolve(response.json());
                }
        })
        .catch(error => { return error })
});
};

export default api;
