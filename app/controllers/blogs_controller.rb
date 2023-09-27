class BlogsController < ApplicationController
    skip_before_action :authorize, only: [:index, :get_blog_users_based_off_params_word]
    def index
        render json: Blog.all
    end

    def create
        blog = Blog.create!(blog_params)
        render json: blog, status: :created
    end

    def get_title
        get_blog_title = Blog.get_title(params[:title])
        get_blog_title_users = get_blog_title.flat_map {|b| b.users}

        if(get_blog_title_users.length > 0)
            render json: get_blog_title_users
        else
            render json: "No blog title matches the params"
        end
    end

    def comment_count
        blogs = Blog.find_blog_comment_count
        blog_comments = blogs.select {|b| b.comments.length >= 3}
        comments_of_blog = blog_comments.flat_map {|b| b.comments}

        if comments_of_blog.length > 0
        render json: comments_of_blog, status: :ok
        else
            render json: {error: 'Not found'}, status: :not_found
        end
    end

    # def get_blog_users_based_off_params_word
    #     blog_params_word_match = Blog.find_blog_wording(params[:word])
    #     user_match_of_blogs_found = blog_params_word_match.flat_map {|b| b.users}

    #     if(user_match_of_blogs_found.length > 0)
    #         render json: user_match_of_blogs_found
    #     else
    #         render json: "sorry"
    #     end
    # end

    # def get_blog_by_word_match
    #     blogs_that_match_param_word = Blog.get_blogs_by_word_match(params[:word])
    #     users_attached_to_blogs = blogs_that_match_param_word.flat_map {|b| b.users}

    #     if(users_attached_to_blogs.length > 0)
    #     render json: users_attached_to_blogs, status: :ok
    #     else
    #         render json: {error: ['No params word mtach found in blogs']}, status: :not_found
    #     end
    # end
    private

    def blog_params
        params.permit(:title, :image, :blog)
    end

end
