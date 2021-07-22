class CreateTeamEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :team_events do |t|
      t.string :team_id
      t.string :game_id
      t.timestamps
    end
  end
end
