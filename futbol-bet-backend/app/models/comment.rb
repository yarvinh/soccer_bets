class Comment < ApplicationRecord
    belongs_to :game
    belongs_to :user, optional: true
    has_many :replies
    # validates :subject, :comment, presence: true
end
