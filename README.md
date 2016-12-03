## Usersテーブル
|column      |  type|option|
|:-----------|-----------:|
|id               |*integer*|null false|
|name         | *string*|null false ※add_index :users, :name|
|email |*string*|null false|
|password| *string*|null false|
|confirm password |*string*|null false|
|group_id |*integer*|null false|

#### user association
    has_many :messages
    has_many :groups, through: :mediums



## Massagesテーブル
|column      |  type|option|
|:-----------|-----------:|
|id |*integer*|null false|
|body| *text*|
|image| *string*|
|group_id| *integer*|null false|
|user_id |*integer*|null false|

#### message association
    belongs_to :user
    belongs_to :group



## Groupsテーブル
|column      |  type|option|
|:-----------|-----------:|
|id |*integer*|null false|
|name|*string*|null false ※add_index :users, :name|

#### group association
    has_many :messages
    has_many :users, through: :mediums



## groups_usersテーブル
|column      |  type|option|
|:-----------|-----------:|
|id |*integer*|null false|
|user_id |*integer*|null false|
|group_id | *integer*|null false|

#### groups_users association
    belongs_to :user
    belongs_to :group