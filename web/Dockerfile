###########################
## STEP 1: Dependencies ##
##########################
FROM node:14-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

###########################
## STEP 2: Build Image ##
##########################
FROM node:14-alpine AS BUILD_IMAGE

ENV NEXT_PUBLIC_ROOT_URL "$ROOT_URL"
ENV NEXT_PUBLIC_API_URL "$API_URL"

WORKDIR /app

# Copy dependencies from previous image
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Remove all the development dependencies since we don't
# need them to run the actual server.
RUN rm -rf node_modules
RUN yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline

###############################
## STEP 3: Production Image ##
##############################
FROM node:14-alpine

ENV NODE_ENV production
ENV PORT 8080

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Pull the built files out of BUILD_IMAGE - we need:
# 1. the package.json and yarn.lock
# 2. the Next build output and static files
# 3. the node_modules.
WORKDIR /app
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/package.json /app/yarn.lock ./
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/public ./public
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/.next ./.next

# 4. Copy the next.config.js
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/next.config.js  ./

USER nextjs

EXPOSE 8080

CMD [ "yarn", "start" ]
