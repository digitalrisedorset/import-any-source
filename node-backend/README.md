# test redis
sudo apt install redis-server
sudo systemctl restart redis.service
redis-cli -h localhost -p 6379 ping