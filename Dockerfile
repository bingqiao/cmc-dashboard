FROM node:10

WORKDIR /cmc-dashboard

COPY dist /cmc-dashboard/dist
COPY local.js /cmc-dashboard

EXPOSE 8080

CMD [ "node", "local.js" ]
