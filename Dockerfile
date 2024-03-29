FROM node:lts AS development

ENV CI=true
ENV PORT=3000

WORKDIR /code
COPY package.json /code/package.json
COPY yarn.lock /code/yarn.lock
RUN yarn install
COPY . /code

CMD [ "yarn", "dev" ]

FROM development AS builder

RUN yarn build

FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)

COPY --from=gloursdocker/docker / /
CMD [ "yarn", "start" ]
