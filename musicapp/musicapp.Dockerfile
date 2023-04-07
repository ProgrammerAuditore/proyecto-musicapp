FROM node:14.21.3-slim

RUN mkdir -p /home/max98/workspace/musicapp

WORKDIR /home/max98/workspace/musicapp

COPY package*.json /home/max98/workspace/musicapp

RUN npm install 

COPY . .

EXPOSE 3015 3015

CMD ["npm","start"]