class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
    t.integer :likes_total, default: 0
    #  t.string :team_1_id
    #  t.string :team_2_id
     t.string :competition
     t.string :winner
     t.boolean :pending, default: false
     t.date :date
     t.time :time
     t.timestamps
    end
  end
end
