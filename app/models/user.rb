class User < ApplicationRecord
    has_secure_password
    validates :username, :password, presence: true
    has_many :comments
    has_many :blogs, through: :comments
end
