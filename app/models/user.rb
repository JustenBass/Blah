class User < ApplicationRecord
    has_secure_password
    has_many :comments, dependent: :delete_all
    has_many :blogs, through: :comments

    validates :username, presence: true, uniqueness: true
    validates :avatar, presence: true

    def self.get_users(name)
        self.select {|u| u.username.downcase.include?(name)}
    end
end



