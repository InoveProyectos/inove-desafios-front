ln -sf $(dirname -- "$(realpath -- $0;)";)/desafios-front /etc/nginx/sites-enabled/desafios-front
sudo systemctl restart nginx.service
