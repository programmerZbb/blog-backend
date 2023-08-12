FROM node:current-alpine3.17 as build-stage
# 给镜像起了一个别名。一定要使用 alpine 版本，使用的是 Linux 裁剪版本

WORKDIR /app

# 单独把这个提出来，如果这个文件没有发生变化就不会重新执行安装
COPY package.json .

# RUN npm install -g npm@9.8.1

RUN npm config set registry https://r.cnpmjs.org \
    && npm install

COPY . .

RUN npm run build

# production stage
FROM node:current-alpine3.17 as production-stage

# from 是什么意思。基于某阶段的路径
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

# 这个环境好像不起作用，需要再run的时候指定
ENV NODE_ENV=production

# RUN npm install -g npm@9.8.1

RUN npm config set registry https://r.cnpmjs.org \
    && npm install --production

EXPOSE 8080

CMD ["node", "/app/main.js"]

# 执行如下，一定要指定环境变量，上面的只是声明
# docker run --name=nest-test -p 3000:3000 -e NODE_ENV=production -d nest-test
# 如果实在存在缓存，直接把对应的image删掉
