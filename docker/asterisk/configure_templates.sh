#!/bin/sh
envsubst < /tmp/odbc.ini.template > /etc/odbc.ini
envsubst < /tmp/res_odbc.conf.template > /etc/asterisk/res_odbc.conf
envsubst < /tmp/ari.conf.template > /etc/asterisk/ari.conf
envsubst < /tmp/manager.conf.template > /etc/asterisk/manager.conf