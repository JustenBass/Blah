class UserSerializer < ActiveModel::Serializer
  #included id attribute to render comments with username in the BlogComments Component
  attributes :id, :username, :avatar
end
