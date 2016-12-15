class GroupsController < ApplicationController
	def index
		@groups = current_user.groups
	end

	def new
	  @group = Group.new
	end

	def create
	  @group = Group.new(group_params)
	  if @group.save
   	     redirect_to group_messages_path(@group)
   	  else
   	  	redirect_to new_group_path, :notice => "please create again"
   	  end
	end

	def edit
	  @group = Group.find(params[:id])
	end

	def update
	  @group = Group.find(params[:id])
	  if @group.update(group_params)
	  	redirect_to group_messages_path(@group)
	  else
	  	redirect_to edit_group_path(@group), notice: "please edit again"
	  end
	end

	private
	def group_params
	  params.require(:group).permit(:name, {user_ids: []})
	end
end
