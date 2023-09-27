class UsersController < ApplicationController
    skip_before_action :authorize, only: [ :create ]


    def create
        user = User.create!(user_params)
            session[:user_id] = user.id
            render json: user
    end


    def show
       render json: @current_user
    end

    def update
        @current_user.update!(user_params)
        render json: @current_user, status: :accepted
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    def get_user_by_word_match
        get_user_by_param_word = User.get_user(params[:word])
        blogs_attached_to_user = get_user_by_param_word.flat_map {|u| u.blogs}

        if blogs_attached_to_user.length > 0
        render json: blogs_attached_to_user, status: :ok
    else
        render json: {error: ['Sorry no username matches param string meaning there are no blogs to render back to you']}, status: :not_found
        end
    end

    private

    def user_params
        params.permit(:username, :avatar, :password, :password_confirmation )
    end


end
