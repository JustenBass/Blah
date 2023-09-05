class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
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

    def update
        username = @current_user.update_attribute(:username, params[:username])
        render json: username
    end



    private

    def user_params
        params.permit(:username, :avatar, :password, :password_confirmation )
    end


end
