class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :blog

    # validates :comment, presence: true

    def user_avatar
        self.user.avatar
    end
    
end
