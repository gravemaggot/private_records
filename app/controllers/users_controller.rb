# frozen_string_literal: true

# Users Controller class
class UsersController < ApplicationController
  include Helpers

  get '/login' do
    erb :login
  end

  get '/users/logout' do
    session.clear
    erb :login
  end

  get '/users/new' do
    if ENV['REG_OPEN'] == 'true'
      @user = User.new({ username: '', email: '', password_digest: '', active: true, is_admin: true })
      erb :user_new
    else
      @error = "Регистрация необходима только администраторам.\n
      Ваша анкета будет доступна по ссылке в письме."
      erb :login
    end
  end

  post '/users' do
    if params[:password] != params[:password_confirm]
      @error = 'Не совпадает пароль при повторном вводе'
      erb :login
    end

    @user = User.new(params[:user])
    @user[:password_digest] = hash_password(params[:password])

    if @user.save
      session.clear
      session[:user_id] = @user.id.to_s
      redirect '/'
    else
      @error = erb_error(@user)
      erb :login
    end

    erb :user_new
  end

  post '/login' do
    user ||= User.where(username: params[:username]).first
    if user && test_password(params[:password], user.password_digest)
      session.clear
      session[:user_id] = user.id.to_s
      redirect '/'
    else
      @error = 'Не верное имя пользователя или пароль'
      erb :login
    end
  end
end
