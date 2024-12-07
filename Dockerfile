# Build stage for React
FROM node:18 AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install -g pnpm
RUN pnpm config set nodeLinker hoisted
RUN pnpm install
COPY client/ ./

# Create a script to generate env config at runtime
RUN echo "window.ENV = JSON.parse(process.env.VITE_ENV || '{}');" > public/env-config.js

RUN pnpm build

# Production stage
FROM python:3.8-slim
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
COPY --from=client-build /app/client/dist /app/client/dist

# Create entrypoint script
RUN echo '#!/bin/sh\n\
echo "window.ENV = {\n\
  VITE_CLERK_PUBLISHABLE_KEY: \"$VITE_CLERK_PUBLISHABLE_KEY\",\n\
  VITE_YN_KEY: \"$VITE_YN_KEY\"\n\
};" > /app/client/dist/env-config.js\n\
\n\
flask run --host=0.0.0.0 --port=8080' > /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENV FLASK_APP=app.py
ENV FLASK_ENV=production

EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]
