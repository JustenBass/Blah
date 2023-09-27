class CommentsController < ApplicationController

    def create
        comment = @current_user.comments.create!(comment_params)
        render json: comment, status: :created
    end

    def update
        comment = @current_user.comments.find(params[:id])
        comment.update!(comment_params)
        render json: comment, status: :ok
    end

    def destroy
        comment = @current_user.comments.find(params[:id])
        comment.destroy
        head :no_content
    end

    private

    def comment_params
        params.permit(:comment, :blog_id)
    end

end
