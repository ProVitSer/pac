#!/bin/sh
envsubst < /tmp/redis.conf.template > /usr/local/etc/redis/redis.conf
envsubst < /tmp/users.acl.template > /usr/local/etc/redis/users.acl