FROM node:9.8

ENV APP_NAME lupus-garupus-back
ENV APP_PATH /opt/${APP_NAME}

# Copy source code
COPY . ${APP_PATH}

VOLUME ${APP_PATH}

# Change working directory
WORKDIR ${APP_PATH}

# Install dependencies
RUN npm install -g pm2 --no-bin-links
RUN npm install

# Expose API port to the outside
EXPOSE 3030

# Launch application
CMD ["bash", "./start.sh"]
