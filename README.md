== README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation
## Usersテーブル
|column      |  type|
|:-----------|-----------:|
|id               |*integer*|
|name         | *string*
|email |*string*
|password| *string*
|confirm password |*string*
|group_id |*integer*


## Massagesテーブル
|column      |  type|
|:-----------|-----------:|
|id |*integer*
|body| *text*
|image| *string*
|group_id| *integer*
|user_id |*integer*

## Groupsテーブル
|column      |  type|
|:-----------|-----------:|
|id |*integer*
|name|*string*

## Mediumテーブル
|column      |  type|
|:-----------|-----------:|
|id |*integer*
|user_id |*integer*
|group_id | *integer*

#### ※messagesテーブルのbodyとimageカラム以外null制約をつける
#### ※groupsテーブルのnameカラムとusersテーブルのnameカラムにindexを貼る

## Association
#### user.rb
    has_many :messages
    has_many :groups, through: :mediums
#### message.rb
    belongs_to :user
    belongs_to :group
#### group.rb
    has_many :messages
    has_many :users, through: :mediums
#### medium.rb
    belongs_to :user
    belongs_to :group
* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


Please feel free to use a different markup language if you do not plan to run
<tt>rake doc:app</tt>.
