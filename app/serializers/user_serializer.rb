class UserSerializer < ActiveModel::Serializer
  attributes :username

  post '/login', to: 'sessions#create'
end
