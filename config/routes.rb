Rails.application.routes.draw do
  devise_for :users

  root "groups#index"
  resources :users, only: [:edit, :update]
  resources :groups, only: [:idex, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
  # resources :messages, only: [:index, :new, :create]
end