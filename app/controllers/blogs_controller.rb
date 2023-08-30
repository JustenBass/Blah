class BlogsController < ApplicationController
    def index
        render json: Blog.all
    end

    def show
        render json: Blog.find_by(id: params[:id])
    end
end
