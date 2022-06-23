FROM node:latest
RUN cd ~/Desktop/projects/masterbot && git pull https://github.com/dylanb-101/masterbot && npm install
CMD ["node", "index.js"]


