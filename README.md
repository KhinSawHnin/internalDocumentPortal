# internalDocumentPortal

#setup instruction

For backend (need to have php 8.2 )
cd backend
composer install
setup default password in env
create schema with mysql


For frontend 
cd frontend
npm install 
npm run dev

#Database commands
php artisan migrate:fresh
php artisan db:seed 
php artisan serve

#Test Credentials
email=admin@workspace.com 
password=(your env default password) 
