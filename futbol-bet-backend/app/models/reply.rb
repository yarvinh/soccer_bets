class Reply < ApplicationRecord
    belongs_to :game
    belongs_to :comment
    belongs_to :user, optional: true

end
