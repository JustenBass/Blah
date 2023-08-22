class BlogSerializer < ActiveModel::Serializer
  attributes :id, :image, :title, :description, :trending
  has_many :users
  # has_many :comments
end
