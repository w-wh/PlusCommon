//5+功能封装
var plusCommon = {
	/**
	 * 从当前页面pop到目标页面
	 * @param {String} targetId 目标页面ID
	 * @param {Boolean} isReload 是否让目标页面执行reload方法刷新（全局刷新）
	 * @param {String} eventName 自定义事件名称，如果存在，就触发（可以实现局部刷新）
	 * @param {Object} data json格式的数据（自定事件参数）
	 */
	popToTarget:function(targetId, isReload, eventName, data){
		//获取目标页面
		var target = plus.webview.getWebviewById(targetId);
		if (!target) {
			console.log("目标页面不存在！");
			return;
		}
		//获取当前页面
		var current = plus.webview.currentWebview();
		if (current === target) {
			console.log("目标页面是当前页面！");
			return;
		}
		//将要关闭的页面
		var pages = new Array(current);
		//父级页面
		var opener = current.opener();
		while (opener){
			if (opener === target) {//找到了目标页面
				//是否需要触发目标页面的自定义事件
				if (eventName) {
					if (isReload) {//全局刷新和局部刷新（自定义事件）同时存在
						//在全局刷新完成之后再触发目标页面的自定义事件
						target.onloaded = function(){
							mui.fire(target, eventName, data);
						};
					} else {
						mui.fire(target, eventName, data);
					}
				}
				//是否需要全局刷新目标页面
				if (isReload) {
					target.reload();
				}
				//关闭目标页面的所有子级页面pages
				pages.map(function(page){
					page.close();
				});
				return;
			}
			pages.push(opener);
			opener = opener.opener();
		}
		//没有找到目标页面
		console.log("目标页面不是当前页面的祖先！");
	}
}