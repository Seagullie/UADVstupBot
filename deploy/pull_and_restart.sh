forever stop dist/runBot.js
git pull
npm install
npm uninstall telegram-bot-framework
npm install git+https://github.com/Seagullie/telegram-bot-framework.git
npx tsc -p tsconfig.prod.json
forever start dist/runBot.js