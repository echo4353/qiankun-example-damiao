# 目录删除及创建
rm -rf ./dist
mkdir ./dist
mkdir ./dist/subapp

# main 基座 
cp -r ./main/dist/* ./dist
# sub-vue
cp -r ./sub-vue/dist/ ./dist/subapp/sub-vue/
# sub-react
cp -r ./sub-react/build/ ./dist/subapp/sub-react/
# sub-html
cp -r ./sub-html/dist/ ./dist/subapp/sub-html/


echo 'build.sh execute success.'