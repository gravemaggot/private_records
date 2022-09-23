ARG RUBY_VERSION
FROM ruby:$RUBY_VERSION-slim-buster

ARG BUNDLER_VERSION
ENV APP_HOME /app
ENV TZ=Europe/Minsk
ENV LANG=C.UTF-8 \
    BUNDLE_JOBS=4 \
    BUNDLE_RETRY=3


RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update -qq && \
    apt-get install -y build-essential && \
    apt-get install -y curl
RUN gem update --system && \
    gem install bundler:$BUNDLER_VERSION

WORKDIR $APP_HOME

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle config set without 'development test' && bundle install
COPY . .
COPY ./app/javascript/* ./public/js/
COPY ./app/images/* ./public/img/
COPY ./app/styles/* ./public/css/

EXPOSE 4567

CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "4567"]
