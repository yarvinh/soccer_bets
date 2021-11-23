class CreateTeamEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :team_events do |t|
      t.string :team_id
      t.string :game_id
      t.integer :points, default: 0
      t.timestamps
    end
  end
end
