class Reply < ApplicationRecord
    belongs_to :game , optional: true
    belongs_to :user
    belongs_to :comment
    belongs_to :user, optional: true

end
