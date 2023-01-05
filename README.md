### Contact book make with NodeJS using Express, Webpack and MongoDB

Simple CRUD (create, read, update, delete) contact book make with NodeJS (JavaScript) using MVC patern (Model, View, Controller) and data base MongoDB for back-end and Webpack.

### Installation

After downloading this project, make sure you have Node JS installed on your machine by running the following command:

```bash
node --version
```

The command should return the version of Node JS installed. If not, download it.

After installing Node JS, you will need to download the necessary modules, for that, inside the terminal, in the project folder execute the command:

Use your preferred package manager (npm, yarn, etc.) to install all dependencies, in my case, I used npm:

```bash
npm install
```

### Running the project

Before running this project certify that you created .env file and it has a variable CONNECTIONSTRING containing your adress of data base MongoDB for that the connection make it.

For running express server, run the next command:

```bash
npm start
```

For running webpack, run the next command:

```bash
npm run dev
```