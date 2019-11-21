### usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :posts
- has_many :groups  through:  :groups_users
- has_many :groups_users

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|title|string|null: false|

### Association
- has_many :users  through:  :groups_users
- has_many :posts
- has_many :groups_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
 

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|text|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|image|text||
### Association
- belongs_to :user
- belongs_to :groups