class CreateBets < ActiveRecord::Migration[6.0]
  def change
    create_table :bets do |t|
      t.string :user_id
      t.string :game_id
      t.string :team_id
      t.integer :amount
      t.timestamps
    end
  end
end
