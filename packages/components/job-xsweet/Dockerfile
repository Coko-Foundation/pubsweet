FROM node:11

WORKDIR /home/node

RUN apt-get update \
    && apt-get install -y software-properties-common unzip

RUN add-apt-repository 'deb http://http.debian.net/debian stretch-backports main' \
    && apt-get update \
    && apt-get install -y openjdk-11-jre-headless

# Install JS dependencies

COPY package.json .
RUN yarn

# Download XSweet
RUN wget https://gitlab.coko.foundation/XSweet/XSweet/repository/archive.zip?ref=master -O xsweet.zip; unzip xsweet.zip; rm xsweet.zip
RUN wget https://gitlab.coko.foundation/XSweet/editoria_typescript/repository/archive.zip?ref=master -O typescript.zip; unzip typescript.zip; rm typescript.zip
RUN wget https://gitlab.coko.foundation/XSweet/HTMLevator/repository/archive.zip?ref=master -O htmlevator.zip; unzip htmlevator.zip; rm htmlevator.zip

# Download Saxon
RUN wget "https://downloads.sourceforge.net/project/saxon/Saxon-HE/9.8/SaxonHE9-8-0-1J.zip" -O saxon.zip; unzip saxon.zip -d saxon; rm saxon.zip

COPY . .

# Test conversion
RUN mkdir _test
RUN unzip src/test.docx -d _test
RUN ./src/execute_chain.sh _test
RUN grep -q 'Testing conversion 123' _test/outputs/16HTML5.html
RUN rm -rf _test

# Start job processing
CMD node src/xsweet.js
