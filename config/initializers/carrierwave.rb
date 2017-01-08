CarrierWave.configure do |config|
  config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['S3_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['S3_SECRET_ACCESS_KEY'],
      region: ENV['S3_REGION'],
      path_style: true,
  }

  config.storage = :fog
  case Rails.env
    when 'production'
      config.storage :fog
      config.fog_directory = "tensho-space"
      config.asset_host = "https://s3-website-ap-northeast-1.amazonaws.com/tensho-space"
    when 'development'
      config.storage :fog
      config.fog_directory = "tensho-space"
      config.asset_host = "https://s3-website-ap-northeast-1.amazonaws.com/tensho-space"
    when 'test'
      config.storage :file
      config.fog_directory = "tensho-space"
      config.asset_host = "https://s3-website-ap-northeast-1.amazonaws.com/tensho-space"
  end
end

