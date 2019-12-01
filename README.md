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

注意:
如果本地与远程github有冲突，需要先解决冲突
git pull origin master --allow-unrelated-histories

--创建分支方法:
git checkout -b login
--切换分支方法:
git checkout master/login
--查看差异
git status
--查看分支
git branch


分支提交本地，并与本地master合并，再提交master到云端中步骤:
1.提交到本地分支 git add .
git commit -m "提交信息"
git push

2.切换主分支
git checkout master
merge login分支代码到master
git merge login
将本地master分支，推送至云端中
git push

此时云端只有master分支 将本地login推送到云端的方法:
1.切换到login分支 git checkout login
2.git push -u origin login (表示将本地login子分支推送到云端origin仓储里面，同时叫做login子分支来保存)


以上总结: 正式项目开发中，一般是提交至本地子分支login中，经过测试没有问题，再合并至主分支master，
然后将主分支提交到云端中 同时，将子分子login也一并提交至云端。