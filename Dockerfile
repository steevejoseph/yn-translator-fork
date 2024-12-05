FROM python:3.8-slim

# Install Node.js and pnpm
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g pnpm

WORKDIR /app
COPY . .

# Install client dependencies
WORKDIR /app/client
RUN pnpm install

# Back to main directory and install Python dependencies
WORKDIR /app
RUN pip3 install -r requirements.txt

EXPOSE 8080
CMD ["python3", "app.py"]