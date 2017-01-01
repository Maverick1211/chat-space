class AddAvatarToMessages < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :avatar, :string
  end
end
