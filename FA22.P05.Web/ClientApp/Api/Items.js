

const axios = require('axios').default;
const url = "fsdkjfhsdkijlf"
// let words = "this is a word"
// let templateLiteral = ` something to read ${words}`


const getAllListItems = () => {
    return axios.get(`${url}/items`)
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.error(error);
        })
        .finally(function () {
            // always executed
        });
}

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
    try {
        const response = await axios.get('/user?ID=12345');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

export { getAllListItems };