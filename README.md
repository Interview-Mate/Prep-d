# Prep'd

Prepare for job interviews with our video chatbot, get feedback on your interview answers, get your programming skills up to scratch with our coding challenges and build yourself the perfect CV and cover letter to land your dream job!

## Getting Started

Before moving ahead, you will need to create a [Cloudinary](https://cloudinary.com) account to save your recordings and create an upload preset (a repository for saving your Cloudinary files). You will also need an API key from [OpenAI](https://platform.openai.com/account/api-keys).

In the `/client` folder, create a file called .env.local:

```bash
touch .env.local
```

In this file, you will need to store your Cloudinary keys:

```bash
REACT_APP_CLOUDINARY_API_KEY="xxx"
REACT_APP_CLOUDINARY_API_SECRET="xxx"
REACT_APP_CLOUDINARY_CLOUD_NAME="xxx"
REACT_APP_CLOUDINARY_UPLOAD_PRESET="xxx"
```

In the `/server` folder, create a file called .env:

```bash
touch .env
```

In this file, you will need to store your Cloudinary and OpenAI keys:

```bash
REACT_APP_CLOUDINARY_API_KEY="xxx"
REACT_APP_CLOUDINARY_API_SECRET="xxx"
REACT_APP_CLOUDINARY_UPLOAD_PRESET="xxx"
chatGPT_key=xxx
```

## Running the app

### Back End

From the root folder, `cd` into the `/server` folder and run `npm i` in order to install all dependencies.

Open 'node_modules/pdf-parse/index.js'
Change line 6 to:
let isDebugMode = false;

Once this is done, run `npm start` to initiate the server on port 4000.

### Front End

Open another terminal and `cd` into the `/client` folder. If you are still in the server folder, `cd ..` into the root folder first, before moving into the client.

Once in the client folder, install all dependencies using `npm i`. Then, run `npm start` to run the scripts and connect the front end. Once all of the above steps are taken, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.