# Use the official Bun image
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Copy application files and install dependencies
COPY package.json bun.lockb ./
RUN bun install --no-save

# Copy the rest of the application code
COPY . .

# Expose port and set start command
CMD ["bun", "run", "dev"]