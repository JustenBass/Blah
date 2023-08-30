class CommentSerializer < ActiveModel::Serializer
  #included user_id attribute to render comments with username in the BlogComments Component
  #included id for map iteration on comments and its key prop
  attributes :id, :comment, :user_id, :blog_id, :username, :user_avatar

  def username
    object.user.username
  end
end
