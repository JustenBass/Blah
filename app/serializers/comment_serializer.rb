class CommentSerializer < ActiveModel::Serializer
  #included user_id attribute to render comments with username in the BlogComments Component
  #included id for map iteration on comments and its key prop
  attributes :id, :comment, :user_id, :blog_id, :username, :user_avatar, :blog


  def username
    object.user.username
  end

  def user_avatar
    object.user.avatar
end



end
