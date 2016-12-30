class GroupsController < ApplicationController
	before_action :find_group, only: %i(edit update)
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

	def search
	  @users = User.where('name LIKE(?)',"%#{search_params[:keyword]}%").where.not(id: current_user.id).order(:name)
    users = @users.map{ |user| user.to_json }
    respond_to do |format|
      format.html { redirect_to new_group_path(@group) }
      format.json { render json: { users: users } }
    end
	end

	private
  def search_params
    params.permit(:keyword)
  end

	def group_params
	  params.require(:group).permit(:name, { user_ids: [] })
	end
end
