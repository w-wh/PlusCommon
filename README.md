# PlusCommon
## 返回到任意的父级页面
在使用之前先引入plus.common.js文件，然后可以有四种方式返回到目标页面：

* 第一种，直接返回到目标页面不做任何刷新：

    ```
    plusCommon.popToTarget(targetId);
    ```

* 第二种，返回到目标页面后做全局刷新：

    ```
    plusCommon.popToTarget(targetId, true);
    ```

* 第三种，返回到目标页面后做触发自定义事件（自定义事件中可以做局部刷新，也可以做其他操作）：

    ```
    plusCommon.popToTarget(targetId, false, "customEvent", {key:value});
    ```

* 第四章，返回到目标页面后即要做全局刷新也要触发自定义事件（自定义事件中可以做局部刷新，也可以做其他操作）：

    ```
    plusCommon.popToTarget(targetId, true, "customEvent", {key:value});
    ```
