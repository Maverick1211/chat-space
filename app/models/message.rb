class Message < ApplicationRecord
	#association
	belongs_to :user
	belongs_to :group
	validates :body, presence: true
  mount_uploader :avatar, AvatarUploader
	def to_json
	  { body: body,
	  	name: user.name,
	  	avatar: avatar,
	  	time: display_time }
	end

	def display_time
	  created_at.strftime('%Y:%m:%d %H:%M')
	end
end
