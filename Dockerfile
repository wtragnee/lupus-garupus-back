FROM node:9.8

ENV APP_NAME lupus-garupus-back

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Expose API port to the outside
EXPOSE 3030

# Launch application
CMD ["npm","start"]
