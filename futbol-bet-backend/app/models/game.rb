class Game < ApplicationRecord
    has_many :bets
    has_many :comments 
    has_many :team_events
    has_many :likes
    has_many :replies, through: :comments
    has_many :users, through: :bets
    has_many :teams, through: :team_events
    attr_accessor :team_1, :team_2
    def comments_by_date()
        self.comments.reverse{|comment|
            comment.created_at
        }
    end

    def self.future_games()
        Game.all.select{|game|
        game.date >= Date.today
    }
    end

    def self.time_zone(t)
        Time.parse(t)   
    end

    def self.date(d)
        Date.parse(d)
    end

end


