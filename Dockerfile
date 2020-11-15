FROM node:12.19-alpine

WORKDIR /rest-api



ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_USER=root
ENV DB_PASS=KaktusKaktus
ENV DB_DIALECT=postgres
ENV DB_NAME_TEST=test_db
ENV DB_NAME_DEVELOPMENT=rest-api_db_dev
ENV DB_NAME_PRODUCTION=prod_db
ENV JWTKEY='fvdlvndsf.4lvds33fkvmdsflvmlvsdfvmkd'
ENV TOKEN_EXPIRATION=48h
ENV BEARER=Bearer

ADD package.json ./

RUN npm install

COPY tsconfig.json ./
COPY tsconfig.build.json ./



COPY ./src ./src



EXPOSE 3000

RUN npm run build

# CMD ["node", "--inspect", "-r", "ts-node/register", "-r", "dotenv/config", "-r", "tsconfig-paths/register", "./dist/index.js"]
CMD ["npm", "run", "start"]