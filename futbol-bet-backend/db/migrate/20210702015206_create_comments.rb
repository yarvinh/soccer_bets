class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.integer :likes
      t.string :game_id
      t.string :user_id
      t.string :comment
      t.timestamps
    end
  end
end
