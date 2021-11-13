class LikesController < ApplicationController
    def create
      @user = User.find(params[:user_id])
    
      like = Like.new()
      like.user = @user
      if params[:game_id]
       game = Game.find(params[:game_id])
       like.game = game
       like.save
       likes = game.likes.size
       game.likes_total = likes
       game.save
      else
        comment = Comment.find(params[:comment_id])
        like.comment = comment
        like.save
      end
      
   
    #   if like.user_id.to_s === @user.id.to_s
    #     user_like = true
    #   else
    #     user_like = false
    # end
    games = Game.all
    render json:GamesSerializer.new(games).to_serialized_json
    end

    def destroy
      like = Like.find(params[:id])
      like.delete
      games = Game.all
      render json:GamesSerializer.new(games).to_serialized_json
    end

end
