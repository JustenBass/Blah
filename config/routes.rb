Rails.application.routes.draw do
  resources :users, only: [ :create, :show, :update, :destroy ]
  resources :blogs, only: [ :index ]
  resources :comments, only: [ :create, :update, :destroy ]

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/profile', to: 'users#show'


  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
