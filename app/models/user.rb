class User < ApplicationRecord
    has_secure_password
    has_many :comments
    has_many :blogs, through: :comments

    validates :username, presence: true
end
