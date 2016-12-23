class Message < ApplicationRecord
	#association
	belongs_to :user
	belongs_to :group
	validates :body, presence: true

	def to_json
	  { body: body,
	  	name: user.name
	  	time: created_at }
	end
end
