pp_path = File.expand_path('../../', __FILE__)
working_directory app_path
pid "#{app_path}/tmp/pids/unicorn.pid"
stderr_path "#{app_path}/log/unicorn.stderr.log"
stdout_path "#{app_path}/log/unicorn.stdout.log"

↓ 以下のように変更

app_path = File.expand_path('../../../', __FILE__)
working_directory "#{app_path}/current"
pid "#{app_path}/shared/tmp/pids/unicorn.pid"
stderr_path "#{app_path}/shared/log/unicorn.stderr.log"
stdout_path "#{app_path}/shared/log/unicorn.stdout.log"
