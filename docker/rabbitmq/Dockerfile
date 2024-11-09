FROM rabbitmq:3.13.6-management

COPY ./rabbitmq.conf /etc/rabbitmq/rabbitmq.conf

COPY ./definitions.json /etc/rabbitmq/definitions.json

RUN apt-get update

RUN apt-get install -y curl && apt-get install -y zip

RUN curl -LO https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/v3.13.0/rabbitmq_delayed_message_exchange-3.13.0.ez --output-dir $RABBITMQ_HOME/plugins

RUN rabbitmq-plugins enable --offline rabbitmq_delayed_message_exchange

RUN rabbitmq-plugins enable --offline rabbitmq_consistent_hash_exchange