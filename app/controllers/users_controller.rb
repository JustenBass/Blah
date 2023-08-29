class UsersController < ApplicationController

    
    def index
        render json: User.all
    end

    #signup
    def create
        user = User.create!(user_params)
            session[:user_id] = user.id
            render json: user
    end

    #stay logged in
    def show
       render json: @current_user
    end

    private

    def user_params
        params.permit(:username, :avatar, :password, :password_confirmation)
    end

end
