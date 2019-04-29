From node:10.15.0

#创建应用运行的文件夹
WORKDIR /app

COPY package*.json ./app

RUN  npm i

COPY . ./app

EXPOSE 3000

#以服务端渲染的方式
RUN npm run build
RUN npm run build:server