FROM fusuf/whatsasena:latest

RUN git clone https://github.com/safiye5151/WhatsAsenaDuplicated1.3.5 /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul
RUN npm install -g whatsdark-npm
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
