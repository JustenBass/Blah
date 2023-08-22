class CreateBlogs < ActiveRecord::Migration[6.1]
  def change
    create_table :blogs do |t|
      t.string :image
      t.string :title
      t.string :description
      t.boolean :trending 

      t.timestamps
    end
  end
end
