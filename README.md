# Bardle

A [Blue Archive](https://bluearchive.nexon.com/) [Wordle](https://en.wikipedia.org/wiki/Wordle) game variant. Guess the character based on the given attributes.

The game is hosted at [bardle.net](https://bardle.net/).

## Development

The game is built with [Angular](https://angular.io/) and [Angular Material](https://material.angular.io/). Python scripts located in `scripts` are used to generate the game data.

### Running the Game Locally

Bardle was developed using Nodejs v22.13.1. To run the game locally, you will need to have Nodejs installed. You can install the required dependencies by running `npm install` in the root of the project. After the dependencies are installed, you can run the game by running `ng serve`. The game will be hosted at `http://localhost:4200/`.

### Building the Game

To build the game, you can run `npm run build`. The built files will be located in the `dist` directory. The game can be hosted on any static file server.

### Running Tests

The game has unit tests written with [Jasmine](https://jasmine.github.io/). You can run the tests by running `npm run test`.

### Deploying the Game

The game is hosted on [Vercel](https://vercel.com/). The game is automatically deployed when changes are pushed to the `master` branch.

## Updating Game Data

The game data is stored in the `public` directory. The two files `character_info.json` and `character_info_gl.json` contain the character data for the JP and GL servers respectively. The data is generated by running the Python script `scripts/__main__.py` in the root of the project.

The script fetches character images and data from [SchaleDB](https://schaledb.com/) and [Blue Archive Wiki](https://bluearchive.wiki/). The script requires multiple dependencies which can be installed by running `pip install -r requirements.txt`.

> [!NOTE]
> The script will crawl those webpages because they do not provide a public api. Please be respectful and do not abuse the script.

The `character_info_gl.json` contains estimated release dates since no official release dates are provided on the wiki. The script will attempt to estimate the release date by adding 6 months to the JP release date. This will become outdated in the future and should be updated manually.

### Anomalies

Some characters may be called differently in SchaleDB and the wiki. The script will attempt to match the names but some characters may not be matched correctly. These differences need to be maintained manually in `schaledb_utils.py`.
