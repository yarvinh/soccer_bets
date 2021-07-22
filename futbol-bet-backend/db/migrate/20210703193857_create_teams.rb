class CreateTeams < ActiveRecord::Migration[6.0]
  def change
    create_table :teams do |t|
      t.string :fc
      t.string :league
      t.string :stadium
      t.string :logo_url
      # t.string :bet_id
      # t.string :game_id
      t.timestamps
    end
  end
end
