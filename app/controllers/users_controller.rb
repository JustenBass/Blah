class UsersController < ApplicationController
    skip_before_action :authorize, only: [:index, :create, :show_two]

    #This gives me all of the comments when thier user name
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
        params.permit(:username, :password, :password_confirmation)
    end

end
