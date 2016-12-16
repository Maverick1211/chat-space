class GroupsController < ApplicationController
	before_action: set_group, only: %i(edit update)
	def index
	  @groups = current_user.groups
	end

	def new
	  @group = Group.new
	end

	def create
	  @group = Group.new(group_params)
    if @group.save
 	    redirect_to group_messages_path(@group), notice: 'you created group!'
 	  else
 	    redirect_to new_group_path, notice: 'please create again'
 	  end
	end

	def edit
	end

	def update
	  if @group.update(group_params)
	    redirect_to group_messages_path(@group), notice: 'you updated group!'
	  else
	  	redirect_to edit_group_path(@group), notice: 'please edit again'
	  end
	end

	private
	def group_params
	  params.require(:group).permit(:name, { user_ids: [] })
	end
	def set_group
		@group = Group.find(params[:id])
	end
end
