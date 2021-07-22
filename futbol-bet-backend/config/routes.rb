Rails.application.routes.draw do
  resources :likes
  resources :team_events
  get "/" , to: 'users#home'
  resources :bets
  resources :teams
  resources :replies
  resources :comments
  resources :users
  resources :games
  # resources :sessions, only: [:create]
  get '/login', to: 'sessions#new'
  post '/login',    to: 'sessions#create'
  post '/signout',   to: 'sessions#destroy'
  get '/islogged_in',to: 'sessions#show'
  delete '/signout', to: 'sessions#destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
