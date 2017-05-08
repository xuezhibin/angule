;(function(w,d) {
	  var tabPic=$('tabPic'),
		  picList=$('picList'),
		  oList=$('picNav').getElementsByTagName('li'),
		  index=0,
		  startTouchX=0,  //代表手点击顺瞬间x坐标
		  totalX=0,  //总共移动过的距离 
		  startX=0,  //代表下次开始移动的距离 
		  sw=viewSize().w,
		  timer=0;
	

	  bindEvent(picList,'touchstart',startFn);
	  bindEvent(picList,'touchmove',moveFn);
	  bindEvent(picList,'touchend',endFn);
	
	
	 function startFn(e) {
		 picList.style.transition="none";
		 startTouchX=e.changedTouches[0].pageX;
		 startX=totalX; 	
		 
		 clearInterval(timer);
	 }
	
	function moveFn(e) {		
		var dis=e.changedTouches[0].pageX-startTouchX;
		totalX=startX+dis;		
		picList.style.webkitTransform="translateX("+totalX+"px)";
	 }
	
	
	function endFn(e) {
	  index=totalX/sw;
	  index=-Math.round(index);  //ceil(),floor()
		
		if(index<0) {
			index=0;
		}else if(index>oList.length-1) {
			index=oList.length-1;
		}
		
		tab();
		autoPlay();
		
	 }
	
	
	//移动切换函数
	function tab() {
		totalX=-index*sw;
		
		//console.log(totalX);
		picList.style.transition="0.6s";
		picList.style.webkitTransform="translateX("+totalX+"px)";
		
		for(var i=0,len=oList.length;i<len;i++) {
			removeClass(oList[i],'high');
		}
		
		addClass(oList[index],'high');	
		
	}
	
	/*自动滑动*/
	
	function autoPlay() {
		timer=setInterval(function() {
			index++;
			
			/*if(index>oList.length-1) {
				index=0;
			}*/
			
			index=index % oList.length;
			console.log(index);
			tab();
		
		},2000);
	
	
	}
	
	autoPlay();
	
	
	
	
	

		  








})(window,document);
