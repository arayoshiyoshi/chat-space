# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

#ChatSpaceDB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|password|string|null: false|
|nickname|string|null: false, unique: true, index: true|
### Association
- has_many :posts
- has_many :groups, through: :groups_users
- has_many :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
### Association
- has_many :users, through: :groups_users
- has_many :groups_users
- has_many :posts

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group