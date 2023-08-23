class CommentsController < ApplicationController

    def create
        comment = @current_user.comments.create!(comment_params)
        render json: comment
    end

    private

    def comment_params
        params.permit(:comment)
    end
end
