class Game < ApplicationRecord
    has_many :bets
    has_many :comments 
    has_many :team_events
    has_many :likes
    has_many :replies, through: :comments
    has_many :users, through: :bets
    has_many :teams, through: :team_events
end
