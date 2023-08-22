class BlogsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]

    def index
        render json: Blog.all
    end

    def show
        render json: Blog.find_by(id: params[:id])
    end
end
