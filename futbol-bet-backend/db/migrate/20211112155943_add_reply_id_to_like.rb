class AddReplyIdToLike < ActiveRecord::Migration[6.0]
  def change
    add_column :likes, :reply_id, :string
    add_column :likes, :string, :string
  end
end
