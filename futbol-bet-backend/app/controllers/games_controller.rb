class GamesController < ApplicationController
 
    def show 
        game = Game.find(params[:id])
        render json:GamesSerializer.new(game).to_serialized_json
    end
    def index
        if user_id = session[:user_id]
          if User.find(user_id).admin
             @games = Game.all
          else
            games = Game.all
            render json:GamesSerializer.new(games).to_serialized_json
          end
        else
            games = Game.all
            render json:GamesSerializer.new(games).to_serialized_json
        end    
    end
    
    def new 
        user = User.find(session[:user_id])
        if User.find_by(admin: true).id === session[:user_id]
          @game = Game.new
        end
    end

    def create
        @game =  Game.create(game_params)
        team_1 = Team.find(game_params[:team_1_id])
        team_1_event = TeamEvent.new
        team_1_event.team = team_1
        team_1_event.game = @game
 
        team_1_event.save
         
        team_2 = Team.find(game_params[:team_2_id])
        team_2_event = TeamEvent.new
        team_2_event.team = team_2
        team_2_event.game = @game
        team_2_event.save

        if game_params[:competition] === 'none'
            @game.update(competition: team_1.league)
        end
        redirect_to new_game_path

    end

    def update
        game = Game.find(params[:id])
        game.update(likes: game.likes + 1)
        render json:GamesSerializer.new(Game.all).to_serialized_json
    end

    def destroy
 
        game = Game.find(params[:id])
        game.team_events.each{|e|e.delete}
        game.delete
        redirect_to games_path
    end

    def game_params
        params.require(:game).permit(:team_1_id, :team_2_id,  :time, :date, :competition)
    end

end
