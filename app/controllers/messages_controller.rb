class MessagesController < ApplicationController
	before_action :find_group, only: %i(index create)
	def index
	  @groups = current_user.groups
	  @users = @group.users
	  @message = Message.new
	  @messages = @group.messages.includes(:user)
	end

	def create
	  @message = Message.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group) }
        format.json { render json: { message: @message.to_json } }
      end
    else
      render :index, notice: 'please create again'
    end
	end

	private
	def message_params
		params.require(:message).permit(:image, :body).merge(user_id: current_user.id, group_id: @group.id)
	end
end
