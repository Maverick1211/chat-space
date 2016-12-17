class Message < ApplicationRecord
	#association
	belongs_to :user
	belongs_to :group
	validates :body, presence: true
end
