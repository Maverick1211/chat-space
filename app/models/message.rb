class Message < ApplicationRecord
	#association
	belongs_to :user
	belongs_to :group
	validates :body, presence: true

	def to_json
	  { body: body,
	  	name: user.name,
	  	time: display_time }
	end

	def display_time
		created_at.strftime('%Y:%m:%d %H:%M')
	end
end
