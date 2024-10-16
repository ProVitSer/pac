FROM debian:11

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y \
    build-essential \
    git \
    curl \
    wget \
    libnewt-dev \
    libssl-dev \
    libncurses5-dev \
    subversion \
    libsqlite3-dev \
    sqlite3 \
    libpq-dev \
    libjansson-dev \
    libxml2-dev \
    libxml2 \
    uuid-dev \
    default-libmysqlclient-dev \
    odbc-postgresql \
    unixodbc \
    unixodbc-dev \
    net-tools \
    sngrep \
    aptitude \
    libedit-dev \
    ncurses-dev  \
    gettext \
    tcpdump && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /tmp/asterisk && cd /tmp/asterisk && \
    curl -sL http://downloads.asterisk.org/pub/telephony/asterisk/asterisk-18-current.tar.gz | tar --strip-components 1 -xvz && \
    contrib/scripts/get_mp3_source.sh  && \
    ./configure  && \
    make menuselect.makeopts && \
    for c in WAV; do ./menuselect/menuselect --enable CORE-SOUNDS-RU-${c} menuselect.makeopts; done && \
    menuselect/menuselect \
    --disable BUILD_NATIVE \
    --enable pbx_ael   \
    --enable res_config_mysql  \
    --disable pbx_lua  \
    --enable func_odbc  \
    --enable func_sorcery  \
    --enable pbx_realtime  \
    --enable res_odbc  \
    --enable codec_opus  \
    --enable codec_silk  \
    --enable cdr_pgsql  \
    --enable format_mp3  \
    --enable app_macro  \
    --enable res_config_pgsql  \
    --disable codec_g729a  \
    --disable chan_mgcp  \
    --disable chan_skinny  \
    --disable chan_unistim  \
    --enable chan_sip  \
    --disable cdr_custom  \
    --disable cdr_manager  \
    --disable cdr_csv  \
    --disable pbx_dundi  \
    --disable astcanary  \
    --disable astdb2sqlite3  \
    --disable astdb2bdb  \
    --disable cdr_sqlite3_custom  \
    --disable format_g719  \
    --disable format_g723  \
    --disable format_g726  \
    --disable format_g729  \
    --disable format_gsm  \
    --disable format_h263  \
    --disable format_h264  \
    --disable format_ilbc  \
    --disable format_pcm  \
    --disable format_siren14  \
    --disable format_siren7  \
    --disable format_sln  \
    --disable format_ogg_speex  \
    --disable format_vox \
    menuselect.makeopts && \
    make clean && make && make install && ldconfig && rm -rf /tmp/* 


RUN apt-get autoremove --purge -y && rm -rf /var/lib/apt/lists/* 

COPY ./asterisk/* /etc/asterisk/

COPY ./templates/* /tmp/

COPY ./configure_templates.sh /usr/local/bin/configure_templates.sh

RUN chmod +x /usr/local/bin/configure_templates.sh

RUN /usr/local/bin/configure_templates.sh

COPY ./config/asterisk /etc/default/asterisk

COPY ./config/odbcinst.ini /etc/odbcinst.ini

RUN groupadd asterisk

RUN useradd -r -d /var/lib/asterisk -g asterisk asterisk

RUN usermod -aG audio,dialout asterisk

RUN chown -R asterisk:asterisk /etc/asterisk /var/lib/asterisk /var/log/asterisk /var/spool/asterisk /usr/lib/asterisk

WORKDIR /etc/asterisk

CMD /usr/local/bin/configure_templates.sh && asterisk -f