# class BetsController < ApplicationController
#     def create
#         team = Team.find(params[:team_id])
#         game = Game.find(params[:game_id])
#         user = User.find(params[:user_id])
#         bet = Bet.new(amount: params[:amount])
#         bet.team = team
#         bet.game = game
#         bet.user = user
#         bet.save
#         user.coins -=  bet.amount.to_i
#         user.save
#         games = Game.all
#         render json:GamesSerializer.new(games).to_serialized_json
#     end
# end

class BetsController < ApplicationController
    def create
        team = Team.find(params[:team_id])
        game = Game.find(params[:game_id])
        user = User.find(params[:user_id])
        
        if !params[:amount].include?("-")
          bet = Bet.new(amount: params[:amount])
          bet.team = team
          bet.game = game
          bet.user = user
          bet.save
          user.coins -=  bet.amount.to_i
          user.save
        end

        games = Game.all
        render json: GamesSerializer.new(games).to_serialized_json
    end
end

