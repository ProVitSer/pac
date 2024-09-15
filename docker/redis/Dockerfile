FROM redis:7-alpine

RUN apk --no-cache add \
    icu-dev \
    gettext \
    gettext-dev

COPY ./config/* /tmp/

COPY ./configure_templates.sh /usr/local/bin/configure_templates.sh

RUN mkdir -p /usr/local/etc/redis

RUN chmod +x /usr/local/bin/configure_templates.sh

CMD /usr/local/bin/configure_templates.sh && redis-server /usr/local/etc/redis/redis.conf --aclfile /usr/local/etc/redis/users.acl
