const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

app.get('/', (req, res) => {
    res.send('Welcome to CORS server 😁')
})


app.post('/cors', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const completion = await openai.createCompletion("text-curie-001", {
    prompt: generatePrompt(req.body.animal),
    temperature: 0.6,
  });
    console.log("first", req.body)
    res.status(200).json({ result: completion.data.choices[0].text });

})

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:
`;
}


// function generatePrompt(p) {
//   return `Add the two given numbers.
  
//     Math: 3 + 6
//     Answer: 9
//     Math: 1 + 6
//     Answer: 7
//     Math: 2 + 6
//     Answer: 8
//     Math: 3 + 6
//     Answer: 9
//     Math: 2 + 2
//     Answer: 4
//     Math: ${p}
//     Answer:`;
// }

app.listen(8080, () => {
    console.log('listening on port 8080')
})