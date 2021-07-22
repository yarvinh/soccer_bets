class UsersController < ApplicationController

    def home
        @user = User.first 
      end

      def show 
       
        if session[:user_id].to_s == params[:id].to_s
          @user = User.find(params[:id])
        else
          redirect_to '/sessions/new'
        end
      end
  
      def new 
         @user = User.new

      end
  
      def create  
       
        if user_params[:admin] && !User.find_by(admin: true)
          @user = User.new(user_params)
            if @user.valid?
               @user.save
               redirect_to '/sessions/new'
             else
              flash[:error] = @user.errors.full_messages 
               redirect_to "/users/new"
            end  
        else 
          @user = User.new(user_params)
          if @user.valid?
            @user.save
            login!
            render json: {logged_in: true, user: @user }
          else
             render json: { logged_in: false , messages: @user.errors.full_messages }
          end
        end
      end

      private
      def user_params
		    params.require(:user).permit(:name, :password, :password_confirmation, :username, :email, :coins, :address, :admin)
      end
end
