# Found Poetry

Deployment: https://ode-to-fluxus.herokuapp.com/

A application that gives you a random set of currently #TrendingWords from Twitter and allows you to drag and drop words and phrases to form poems in an avant garde, free form style (similar to ee cummings or fluxus).

This application was inspired by the concept of Found Poetry. Found Poetry is a type of poetry created by taking words, phrases, and sometimes whole passages from other sources and reframing them by making changes in spacing and lines, or by adding or deleting text, thus imparting new meaning.

## Stack
- Node.js
- Express.js
- Sequelize
- React
- Redux
- Twitter API
- Twitter Oauth
- CSS

## Example from Literature:
![Image of Poem](https://i.pinimg.com/236x/36/69/a8/3669a88b74bac893c641c889b45f7a33--ee-cummings-revolutionaries.jpg) - ee cummings


## Example from my application
![Imgur](https://i.imgur.com/vI7Gij6.png)

=====================================================================================

#### Installation
download or fork the application onto your computer

1. Obtain your own Twitter customer key, Twitter customer secret, Twitter access token key and Twitter access token secret. Please refer to the Twitter documentation on how to obtain your own secrets in order to run this application. Please place these keys and codes within a hidden secrets.js file at the root level of your application.

2. Add ```process.env.TWITTER_CALLBACK = http://127.0.0.1:3000/auth/twitter/callback'``` to your secrets.js file

3. `npm run start-dev`

4. open http://127.0.0.1:3000
