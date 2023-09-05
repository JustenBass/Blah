class CommentBlogSerializer < ActiveModel::Serializer
  attributes :id, :image, :title, :blog, :trending 
end
