class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :posts
  
  validates :name, presence: true, uniqueness: true

  def show_last_message
    if (last_message = posts.last).present?
      if last_message.content?
        last_message.content
      else
        "画像が投稿されています"
      end
    else
      "まだメッセージはありません"
    end
  end

end
