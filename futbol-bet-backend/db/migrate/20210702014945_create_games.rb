class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
     t.integer :likes_total, default: 0
     t.string :competition
     t.string :status
     t.boolean :pending, default: true
     t.date :date
     t.time :time
     t.timestamps
    end
  end
end
