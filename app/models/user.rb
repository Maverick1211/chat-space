class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  #association
  has_many :group_users
  has_many :groups, through: :group_users, foreign_key: :group_id
  has_many :messages
	def to_json
		{ id: id,
		  name: name }
	end
end
