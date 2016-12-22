require 'rails_helper'

describe MessagesController do
  describe "when_user_signed_in" do
    before :each do
      sign_in user
    end
    let(:group) { create(:group, users: [user]) }
    let(:message) { create(:message, user: user, group: group) }
    let(:user) { create(:user) }
    describe ' GET #index ' do
      it "assigns the requested group to @group" do
        get :index, group_id: group
        expect(assigns(:group)).to eq(group)
      end

      it "assigns the requested groups to @groups" do
        groups = create_list(:group, 3, users: [user])
        get :index, group_id: groups.first
        expect(assigns(:groups)).to eq(groups)
      end

      it "assigns the requested users to @users" do
        users = create_list(:user, 3, groups: [group])
        get :index, group_id: group
        expect(assigns(:users)).to eq([user] + users)
      end

      it "assigns the requested messages to @messages" do
        messages = create_list(:message, 3, group: group, user: user)
        get :index, group_id: group
        expect(assigns(:messages)).to eq(messages)
      end

      it "assigns the requested message to @message" do
        get :index, group_id: group
        expect(assigns(:message)).to be_a_new(Message)
      end
      
      it "renders the :index template" do
        get :index, group_id: group
        expect(response).to render_template :index
      end
    end
    
    describe ' POST #create ' do
      it "assigns the requested message to @message" do
        get :index, group_id: group
        expect(assigns(:message)).to be_a_new(Message)
      end
    
      it "with invalid attributes" do
        expect{ post :create, group_id: group, message: attributes_for(:message) }.to change(Message, :count).by(1)
      end
    
      it "redirect_to the index" do
        post :create, group_id: group, message: attributes_for(:message)
        expect(response).to redirect_to group_messages_path(group)
        expect(flash[:notice]).to be_present
      end
    end
  end
  describe "sign_out_user" do
    it "redirect to /users/sign_in" do
      group = create(:group)
      get :index, group_id: group
      expect(response).to redirect_to new_user_session_path
    end
  end
end
