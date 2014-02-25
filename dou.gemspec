$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "dou/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "dou-rails"
  s.version     = Dou::VERSION
  s.authors     = ["Hearty, Oh"]
  s.email       = ["heartyoh@gmail.com"]
  s.homepage    = "http://github.com/heartyoh/dou"
  s.summary     = "A gem for Dou javascript module framework"
  s.description = "This gem provides light-weight javascript module framework for your Rails 3 application."
  s.license     = "MIT"

  s.required_rubygems_version = ">= 1.3.6"
  
  s.add_dependency "railties", ">= 3.0", "< 5.0"
  
  s.files = Dir["lib/**/*.rb", "vendor/assets/**/*", "MIT-LICENSE", "README.md"]
  s.require_path = 'lib'
end
