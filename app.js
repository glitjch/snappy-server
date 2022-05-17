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
    res.send('Welcome to openai elevator pitch 😁')
})

app.post('/pitch', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const completion = await openai.createCompletion("text-curie-001", {
    prompt: generatePrompt(req.body.user),
    temperature: 0.99,
    max_tokens: 64,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    presence_penalty: 0.31,
  });
    console.log("first", req.body)
    res.status(200).json({ result: completion.data.choices[0].text });
})

function generatePrompt(p) {
  return `Convert the info into a descriptive paragraph like an elevator pitch.
  
  Info: name: Sally career: Chef specialty: Mexican job-description: enjoyable, rewarding goal: connect
  Answer: Hi, my name is Sally. It's nice to meet you! I'm a chef, specializing in Mexican cuisine. I find being chef is enjoyable and rewarding. I'd love to connect with you and your company. Would you mind if I set up a quick call next week for us to talk about any upcoming opportunities on your team?
  
  Info: name: John career: Cook specialty: Sushi job-description: fast-paced, exciting goal: connect
  Answer: Hi, my name is John. It's so nice to meet you! I'm a cook, specializing in sushi. I find the work fast-paced and exciting. I'd love to the opportunity to connect my expertise to your company. Would you mind if I set up a quick call next week for us to talk about any upcoming opportunities on your team?
  
  Info: name: John career: Cook specialty: Sushi job-description: fast-paced, exciting goal: connect
  Answer: Hi, my name is John. It's so nice to meet you! I'm a cook, specializing in sushi. I find the work fast-paced and exciting. I'd love to the opportunity to connect my expertise to your company. Would you mind if I set up a quick call next week for us to talk about any upcoming opportunities on your team?
  
  Info: name: Samantha career: Accountant specialty: taxes job-description: challenging, team-oriented goal: new proejects
  Answer: Hello, my name is Samantha. It's so nice to meet you! I'm an accountant, specializing in taxes. I find the work challenging and team-oriented. I'd love to the opportunity to join new projects or start a new one with my expertise. Would you mind if I set up a quick call next week for us to talk about any upcoming projects on your team?
  
  Info: name: Poppy career: police specialty: crime job-description: stressful, tiring goal: promotion
  Answer: Hi, I'm Poppy. It's my pleasure to meet you! I am a police who specializes in crime. I find my line of work stressful and tiring. I'd be very interested to get a raise with my expertise. Would you mind if I set up a quick meeting tomorrow for us to chat about any promotions?
  
  Info: ${p}
  Answer:`;
}

app.listen(8080, () => {
    console.log('listening on port 8080')
})


// Math: 3 + 6
//     Answer: 9
//     Math: 1 + 6
//     Answer: 7
//     Math: 1+6
//     Answer: 7
//     Math: 1+ 6
//     Answer: 7
//     Math: 1+ 6
//     Answer: 7
//     Math: 1+ 6
//     Answer: 7
//     Math: 1 plus 6
//     Answer: 7
//     Math: 1 plus 9
//     Answer: 10
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