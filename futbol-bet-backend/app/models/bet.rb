class Bet < ApplicationRecord
    belongs_to :user
    belongs_to :game
    belongs_to :team, optional: true

    # validates :user_id, :team_id, :game_id, :amount  presence: true
    
end
