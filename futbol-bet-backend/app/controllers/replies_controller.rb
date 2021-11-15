class RepliesController < ApplicationController
    def create
        user = User.find(params[:user_id])
        comment = Comment.find(params[:comment_id])
        reply = Reply.new(reply: params[:reply])
        reply.save
        reply.user = user
        reply.comment = comment
        reply.save
        render json:GamesSerializer.new(Game.all).to_serialized_json
    end
    
    def destroy

    end
end
