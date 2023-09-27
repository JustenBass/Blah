class Blog < ApplicationRecord
    has_many :comments
    has_many :users, through: :comments

    # def self.get_title(params)
    #    self.select {|b| b.title.downcase.include?(params)}
    # end


    # def self.find_blog_wording(words)
    #     self.select {|b| b.blog.downcase.include?(words)}
    # end

    # def self.get_blogs_by_word_match(word)
    #     self.select {|b| b.blog.downcase.include?(word)}
    # end

    def self.find_blog_comment_count
        self.select {|b| b.comments}
    end
end
