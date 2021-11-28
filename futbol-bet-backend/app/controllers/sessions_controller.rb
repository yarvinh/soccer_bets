class SessionsController < ApplicationController

    def show
        
        if logged_in? 
            user = User.find(session[:user_id])
            render json: {logged_in: true, user: user}
        else
            render json: {logged_in: false, messages: ['No user, please login']}
       end

    end  

    def create  
        @user = User.find_by(username: params[:user][:username])
        if @user && @user.authenticate(params[:user][:password])
            login!
            if @user.admin
               redirect_to user_path(@user)
            else    
               render json: {logged_in: true, user: @user }
            end
        else
            render json: {logged_in: false, status: 401, messages: ['wrong password or username'] }
        end   
    end
  
    def destroy
        session.clear
        redirect_to "/games"
    end

    def log_out
        session.clear
        render status: 200, json: { logged_in: false , messages: ["logout succesfull "] }
    end
end
