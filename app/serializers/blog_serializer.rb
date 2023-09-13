class BlogSerializer < ActiveModel::Serializer
  #included id to be able to find current blog in CurrentBlog component
  attributes :id, :image, :title, :blog, :trending
  # has_many :users, serializer: BlogUserSerializer
  #included has_many comments to iterate through and render current blog comments to the current blog page
  has_many :comments

end
