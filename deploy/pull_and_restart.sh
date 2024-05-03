forever stop dist/runBot.js
git pull
npm install
npm install git+https://github.com/Seagullie/telegram-bot-framework.git
tsc .
forever start dist/runBot.js