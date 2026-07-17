# 1. Node.js ka official lightweight version use karein
FROM node:18-slim

# 2. Container ke andar folder banayein
WORKDIR /usr/src/app

# 3. Dependencies copy aur install karein
COPY package*.json ./
RUN npm install --production

# 4. Baaki saara code copy karein
COPY . .

# 5. Port expose karein
EXPOSE 5000

# 6. Server start karne ki command
CMD ["node", "server.js"]