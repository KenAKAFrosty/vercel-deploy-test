const axios = require('axios');

run();


async function run() { 
    const response = await axios({
        method:'post',
        url:"http://localhost:3000/api/getNow",
        data:{"its":"something"}
    });
    console.log(response.data);
}