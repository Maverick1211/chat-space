## Usersテーブル
|column      |  type|option               |
|:-----------|-----------|-----------:|
|id               |*integer*|null false   |
|name         | *string*|null false ※add_index|
|email |*string*|null false               |
|password| *string*|null false            |
|confirm password |*string*|null false    |
|group_id |*integer*|null false           |

#### association
    has_many :messages
    has_many :groups_users
    has_many :groups, through: :groups_users



## Massagesテーブル
|column      |  type|option|
|:-----------|-----------|-----------:|
|id |*integer*|null false|
|body| *text*|
|image| *string*|
|group_id| *integer*|null false|
|user_id |*integer*|null false|

#### association
    belongs_to :user
    belongs_to :group



## Groupsテーブル
|column      |  type|option           |
|:-----------|-----------|-----------:|
|id |*integer*|null false             |
|name|*string*|null false ※add_index|

#### association
    has_many :messages
    has_many :groups_users
    has_many :users, through: :groups_users



## groups_usersテーブル
|column      |  type|option|
|:-----------|-----------|-----------:|
|id |*integer*|null false|
|user_id |*integer*|null false|
|group_id | *integer*|null false|

#### association
    belongs_to :user
    belongs_to :group