class CommentsController < ApplicationController
    # skip_before_action :authorize, only: :index

    def index
        comments = current_user.comments
        render json: comments
    end

    def create
        comment = current_user.comments.create!(comment_params)
        render json: comment, status: :created
    end

    private

    def comment_params
        params.permit(:comment, :user_id, :blog_id)
    end

    def current_user
        @current_user = User.find_by(id: session[:user_id])
    end
end
