FROM node:20

WORKDIR /app

# Copier d'abord package.json pour mieux utiliser le cache Docker
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers
COPY . .

EXPOSE 5000
CMD ["npm", "start"]