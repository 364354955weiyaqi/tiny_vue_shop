# tiny_vue_shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



备注：如何将vue-cli创建的项目关联到github或gitlab远程仓库
进入需要关联到远程仓库的项目文件夹中，执行以下命令：
1、git init
--使用git初始化项目
2、git remote add origin < remote-project-repository-address >
--项目关联到远程仓库，< remote-project-repository-address >为远程项目仓库的地址
3、git add .
--将本地项目添加到暂存区
4、git commit -m '自己提交的描述'
--将项目提交本地版本库
5、git push -u origin master
--将项目推送到远程仓库