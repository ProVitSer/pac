#!/bin/sh
envsubst < /tmp/odbc.ini.template > /etc/odbc.ini
envsubst < /tmp/res_odbc.conf.template > /etc/asterisk/res_odbc.conf
envsubst < /tmp/ari.conf.template > /etc/asterisk/ari.conf
envsubst < /tmp/manager.conf.template > /etc/asterisk/manager.conf
envsubst < /tmp/http.conf.template > /etc/asterisk/http.conf
envsubst < /tmp/res_pgsql.conf.template > /etc/asterisk/res_pgsql.conf
envsubst < /tmp/cdr_pgsql.conf.template > /etc/asterisk/cdr_pgsql.conf

