# You can use RethinkDB with Docker
# https://hub.docker.com/_/rethinkdb/
# to easily setup your environment. To run locally you can do:

FROM ubuntu:latest

# Rethink

FROM rethinkdb:latest

# Install build tools
RUN apt-get -y update && apt-get install -y curl git

# Install Node.js and Yarn
RUN curl -sL 'https://deb.nodesource.com/setup_8.x' | bash /dev/stdin && \
    curl -sS 'https://dl.yarnpkg.com/debian/pubkey.gpg' | apt-key add - && \
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get -y update && \
    apt-get install -y nodejs yarn

# Give permissions to rethinkdb.list file
# By default got errors saying cant read /etc/apt/sources.list.d/rethinkdb.list
RUN chmod a+rw /etc/apt/sources.list.d/rethinkdb.list

# Start up RethinkDB
RUN rethinkdb --daemon

