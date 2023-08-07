const axios = require("axios");

const command = process.argv[2];

async function sendRequest(command) {
  try {
    const response = await axios.get(`http://localhost:3000/${command}`);
    console.log(response.data.message);
  } catch (error) {
    console.error("Error sending request", error.message);
  }
}

sendRequest(command);