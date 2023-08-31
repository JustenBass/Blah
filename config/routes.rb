Rails.application.routes.draw do
  resources :users, only: [:create, :show]
  resources :blogs, only: [:index]
  resources :comments, only: [:index, :create, :update, :destroy]

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'


  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
