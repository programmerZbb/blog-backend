# 博客项目后端

## 问题记录

- 服务端上传文件地址待确认
* grpc 异常处理，主要是异常格式
* rxjs error处理

# 架构
## db
* entity 和 repository 一一对应，名称最好也保持一致
* dto 代表接口数据的约束，一般写到module中
* vo 代表对数据库数据的约束，一般直接写到repository中
