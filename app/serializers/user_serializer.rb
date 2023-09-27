class UserSerializer < ActiveModel::Serializer
  #included id attribute to render comments with username in the BlogComments Component
  attributes :id, :username, :avatar, :unique_blogs

  def unique_blogs
    object.blogs.uniq
  end
end
