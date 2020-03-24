class Post < ApplicationRecord

  belongs_to :group
  belongs_to :user
  # validates :content, presence: true, uniqueness: true
  validates :content, presence: true, unless: :image?

  mount_uploader :image, ImageUploader
end
