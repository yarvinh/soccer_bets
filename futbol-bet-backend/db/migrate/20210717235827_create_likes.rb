class CreateLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :likes do |t|
      t.integer :likes, default: 0
      t.string :user_id
      t.string :game_id
      t.string :reply_id
      t.string :comment_id
      t.timestamps
    end
  end
end
