
# Prep'd

Looking to ace your next job interview and land your dream job? Look no further than Prep'd – the revolutionary app that transforms job interview preparation into an immersive and effective experience.

Prep'd offers a comprehensive suite of features that are designed to help job seekers build the skills, confidence, and materials they need to succeed in today's competitive job market. With Prep'd, users can:

-  Engage with an interactive 3D chatbot that simulates a job interview, providing personalized feedback and recommendations on how to improve their responses.

-  Sharpen their programming skills with a variety of coding challenges, evaluated in a safe sandbox environment.

-  Create the perfect cover letter, tailored to their specific experience and job requirements, with the help of our AI-powered generator.

-  Review an existing cover letter and receive critiques and recommendations as well as generate an optimized version, ensuring that it stands out from the crowd and highlights their unique qualifications.

-  Track their progress and insights, gaining valuable feedback on their skills and improvements over time.

Whether you're just starting your job search or looking to take your career to the next level, Prep'd is the ultimate tool for success. With cutting-edge technology and personalized guidance, you'll be ready to ace any job interview and land the job of your dreams.

## Table of Contents

- [Prep'd](#prepd)
  - [Getting Started](#getting-started)
  - [Running the app](#running-the-app)
  - [Alternatively:](#alternatively)
    - [Back End](#back-end)
    - [Front End](#front-end)
  - [Tech Stack](#tech-stack)
  - [Authors](#authors)

## Getting Started

Before moving ahead, you will need to create a [Cloudinary](https://cloudinary.com) account to save your recordings and create an upload preset (a repository for saving your Cloudinary files). 
You will also need an API key from [OpenAI](https://platform.openai.com/account/api-keys).

In the `/client` folder, create a file called .env.local:

```bash
touch .env.local
```

Copy the contents of the .env.sample file into the .env.local file and add your data:


In the `/server` folder, create a file called .env:

```bash
touch .env
```

Copy the contents of the .env.sample file into the .env file and add your data:

## Running the app
In order to install all the required dependencies, open a terminal from the root folder and run:

```bash
npm install
```
Once the installation is completed, simply run:

```bash
npm run start:server-client
```

To obtain a comprehensive summary of the API endpoints, please refer to this [Postman collection](https://documenter.getpostman.com/view/25563730/2s93RRvskj).


## Alternatively:

### Back End

From the root folder, `cd` into the `/server` folder and run `npm i` in order to install all dependencies.


Open 'node_modules/pdf-parse/index.js'

Change line 6 to:

let isDebugMode = false;

Once this is done, run `npm run server` to initiate the server on port 4000.

### Front End

Open another terminal and `cd` into the `/client` folder. If you are still in the server folder, `cd ..` into the root folder first, before moving into the client.

Once in the client folder, install all dependencies using `npm i`. Then, run `npm start` to run the scripts and connect the front end. Once all of the above steps are taken, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

Frontend: [![React](https://img.shields.io/badge/React-blue?logo=react&logoColor=white)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Monaco Code Editor](https://img.shields.io/badge/Monaco%20Code%20Editor-blue?logo=visual-studio-code&logoColor=white)](https://microsoft.github.io/monaco-editor/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-blue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![React PDF Renderer](https://img.shields.io/badge/React%20PDF%20Renderer-blue?logo=react&logoColor=white)](https://react-pdf.org/)
[![ChartJS](https://img.shields.io/badge/ChartJS-blue?logo=chartjs&logoColor=white)](https://www.chartjs.org/)

Backend: [![Express.js](https://img.shields.io/badge/Express.js-grey?logo=express&logoColor=white)](https://expressjs.com/) [![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb&logoColor=white)](https://www.mongodb.com/) [![Mongoose](https://img.shields.io/badge/Mongoose-green?logo=mongodb&logoColor=white)](https://mongoosejs.com/) [![OpenAI](https://img.shields.io/badge/OpenAI-grey?logo=openai&logoColor=white)](https://openai.com/) 

Speech to Text: [![Web Speech API](https://img.shields.io/badge/Web%20Speech%20API-blue?logo=google&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) [![Punctuator API](https://img.shields.io/badge/Punctuator%20API-blue?logo=google&logoColor=white)](https://punctuator2.datasciencelab.co.uk/)

Animation: 
[![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-blue?logo=react&logoColor=white)](https://docs.pmnd.rs/react-three-fiber) 
[![React Three Drei](https://img.shields.io/badge/React%20Three%20Drei-blue?logo=react&logoColor=white)]()

Image and Audio Hosting: [![Cloudinary](https://img.shields.io/badge/Cloudinary-blueviolet?logo=cloudinary&logoColor=white)](https://cloudinary.com/)

Authentication: [![Auth0](https://img.shields.io/badge/Auth0-blueviolet?logo=auth0&logoColor=white)](https://auth0.com/)


## Authors

Boryana Micheva - [Github](https://github.com/BoryBo)

Colin Howard - [Github](https://github.com/colinhoward89)

Darian Pirowhedayati - [Github](https://github.com/DarianPiro)

David Chamberlain - [Github](https://github.com/DRC222)

Elise Verhoeye - [Github](https://github.com/huntingforelise)

Sarah Lash - [Github](https://github.com/Sarahlash92)