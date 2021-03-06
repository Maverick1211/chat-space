Rails.application.routes.draw do
  devise_for :users
  resources :groups, except: [:show, :delete] do
    resources :messages, only: [:index, :create]
  end
  get 'search' => 'groups#search'
  root to: "groups#index"
end
