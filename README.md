# 运行
```
npm run android
```

# 打包到安卓

## 1、先在主目录运行
```
react-native bundle --platform android --dev false --entry-file src/thread/index.js --bundle-output android/app/src/main/assets/threads/thread/index.bundle --assets-dest android/app/src/main/res
```

## 2、在前往引用Thread的文件
```
    const thread = new Thread('thread/index.js'); // 打包时的路径
    // const thread = new Thread('../src/thread/index.js'); // 开发环境的路径
```

## 3、前往 /android 目录
```
gradlew assembleRelease
```
