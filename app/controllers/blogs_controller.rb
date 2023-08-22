class BlogsController < ApplicationController
    skip_before_action :authorize, only: :index
    def index
        render json: Blog.all
    end
end
