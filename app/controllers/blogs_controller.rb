class BlogsController < ApplicationController
    skip_before_action :authorize, only: [:unauthorized_blogs, :index]

    def index
        render json: Blog.all
    end

    def unauthorized_blogs
        unauthorized_content = Blog.where(trending: true)
        render json: unauthorized_content
    end


    def show
        render json: Blog.find_by(id: params[:id])
    end
end
