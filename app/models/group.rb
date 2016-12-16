class Group < ApplicationRecord
  #association
  has_many :group_users
  has_many :users, through: :group_users, foreign_key: :user_id
  validates :name, presence: true
end
