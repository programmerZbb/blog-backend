# 创建公共网络
docker network create blog-network 
# 启动MySQL
docker run -v /Users/zhangbinbinb28199/my-data/backend/mysql/data:/var/lib/mysql --user 501:501 -p 8096:3306 --name mysql-service -e MYSQL_ROOT_PASSWORD=qazplm -d mysql