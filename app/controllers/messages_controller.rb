class MessagesController < ApplicationController
	def index
	  @groups = current_user.groups
	  @group = Group.find(params[:group_id])
	  @users = @group.users
	  @message = Message.new
	  @messages = Message.where(group_id: params[:group_id])
	end

	def create
	  @group = Group.find(params[:group_id])
	  @message = Message.new(message_params)
	  if @message.save
	  	redirect_to group_messages_path(@group)
	  else
	  	redirect_to group_messages_path(@group), notice: "please create again"
	  end
	end

	private
	def message_params
		params.require(:message).permit(:image, :body).merge(user_id: current_user.id, group_id: @group.id)
	end
end
