## Snappy 

### This is the server side of Snappy, the quick elevator pitch generator with ai-powered customization.

</br>

### Instructions

1. Install dependancies 
``` 
npm install 
```

2. Sign up for a free account with openai here: https://beta.openai.com/signup

3. Retrieve your secret API key here, once you have successfully created an openai account: https://beta.openai.com/account/api-keys 

4. Create a copy of the .env.copy file in the root directory, then place your secret API key there.

5. Server-side: (this one)
```
node app.js
```
6. Client-side: 
```
npm start
``` 

Note: with a free openai account you are limited up to $18 worth of API requests, which should suffice for testing purposes. We are using the less expensive ai engine, "text-curie-001”, which is still powerful, so that we do not exceed the limit.