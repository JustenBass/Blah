Rails.application.routes.draw do
  resources :users, only: [ :create, :show, :update, :destroy ]
  resources :blogs, only: [ :index, :create]
  resources :comments, only: [ :create, :update, :destroy ]

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/profile', to: 'users#show'
  # get '/blogs/users/:word', to: 'blogs#get_blog_users_based_off_params_word'
  # get '/blogs/get_title/:title', to: 'blogs#get_title'
  # get '/blogs/get_blog_by_word_match/:word', to: 'blogs#get_blog_by_word_match'
  get '/users/get_user_by_word_match/:word', to: 'users#get_user_by_word_match'
  get '/blogs/comment_count', to: 'blogs#comment_count'



  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
