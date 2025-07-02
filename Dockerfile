FROM node:22.16.0-alpine

# Installation des dépendances système
RUN apk update && apk upgrade && \
    apk add --no-cache git

WORKDIR /usr/src/app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances, y compris les devDependencies nécessaires pour le build
RUN npm install

# Copie du reste des fichiers
COPY . .

# Build de l'application
RUN npm run build

ENV NODE_ENV production
ENV PORT 80

EXPOSE 80

# Démarrage de l'application depuis le dossier build
CMD [ "node", "build/bin/server.js" ]
