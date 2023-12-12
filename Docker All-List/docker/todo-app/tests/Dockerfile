FROM betrybe/puppetter:1.0

WORKDIR /app/tests

ADD node_modules.tar.gz .

# RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD ["test"]
