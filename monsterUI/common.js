/* 通用函数 */

/* 
 * tab切换 
 * el	导航的父元素
 * data	自定义属性data-
 * itemClass	内容div的class
 */
function tabChange(el, data, itemClass) {
	$(el).on('click', 'li', function() {
		var cla = $(this).attr(data);
		$(this).addClass('active').siblings().removeClass('active');
		$('#' + cla).removeClass('hide').siblings(itemClass).addClass('hide');
	})
}

/* 
 * 图片上传预览 
 * imgEl	图片元素
 * tag		input e.target
 */
function uploadImg(el, tag) {
	var file = tag.files[0];
	var imgSrc;
	if (!/image\/\w+/.test(file.type)) {
		alert("看清楚，这个需要图片！");
		return false;
	}
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function() {
		imgSrc = this.result;
		// 添加新的src到HTML
		$(el).attr("src", imgSrc);
	};
}
/* 
 * 倒计时 展示分钟和秒
 * time	时间 1分钟即time=1
 * el	展示时间的元素
 */
function countDown(time, el) {
	var result = time * 60;
	var interval = setInterval(sub, 1000); //定时器 调度对象
	/*封装减1秒的函数*/
	function sub() {
		if (result > 1) {
			result = result - 1;
			var second = Math.floor(result % 60); // 计算秒 ，取余
			var minite = Math.floor((result / 60) % 60); //计算分 ，换算有多少分，取余，余出多少秒
			var hour = Math.floor((result / 3600) % 24); //计算小时，换算有多少小时，取余，24小时制除以24，余出多少小时
			var day = Math.floor(result / (3600 * 24)); //计算天 ，换算有多少天

			$(el).html(PrefixInteger(minite, 2) + "分钟" + PrefixInteger(second, 2) +
				"秒"); //PrefixInteger按照指定长度为数字前面补零
		} else {
			//alert("倒计时结束！");
			window.clearInterval(interval); //这里可以添加倒计时结束后需要执行的事件
		}
	};
}
// 时间补0
function PrefixInteger(num, length) {
	return (Array(length).join('0') + num).slice(-length);
}
/* 
 * 开始时间 结束时间计算
 * startTime	开始时间
 * endTime	结束时间
 * diff	时间间隔
 * nowTime 当前时间
 * 返回 状态0 1 2 3
 */
function timeCompute(startTime, endTime, diff) {
	var nowTime = new Date().getTime();
	if ((startTime - nowTime) > diff) {
		return 0;
	} else if ((startTime - nowTime) > 0) {
		return 1;
	} else if ((endTime - nowTime) > 0) {
		return 2;
	} else if ((endTime - nowTime) < 0) {
		return 3;
	}
}
/* 
 * 时间格式化 年月日
 * date
 * charStr "- ."
 * 返回 2019.10.30
 * 调用 formmatDate(new Date(),'.')
 */
function formmatDate(date, charStr) {
	var date = new Date(date)
	if (null == charStr || 'undefined' == typeof charStr) {
		var year = date.getFullYear().toString();
		var month = (date.getMonth() + 1) <= 9 ? "0" +
			(date.getMonth() + 1) : (date.getMonth() + 1);
		var day = date.getDate() <= 9 ? "0" + date.getDate() : date
			.getDate();
		return year + '年' + month + '月' + day + '日';
	} else {
		var year = date.getFullYear().toString();
		var month = (date.getMonth() + 1) <= 9 ? "0" +
			(date.getMonth() + 1) : (date.getMonth() + 1);
		var day = date.getDate() <= 9 ? "0" + date.getDate() : date
			.getDate();
		return year + charStr + month + charStr + day;
	}

}
/* 
 * 时间格式化 年月日时分秒
 * time	
 * charStr "- ."
 * 返回 2019.10.30 01:34:09
 * 调用 formmatDateTime(new Date(),'.')
 */
function formmatDateTime(time, charStr) {
	var date = new Date(time);
	if ('undefined' == typeof charStr || null == charStr) {
		return date.getFullYear() + '年' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
			'月' + (
				date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + "日 " + (date.getHours() < 10 ? '0' + date.getHours() :
				date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() <
				10 ? '0' + date.getSeconds() : date.getSeconds());
	} else {
		return date.getFullYear() + charStr + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
			charStr + (
				date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + (date.getHours() < 10 ? '0' + date.getHours() :
				date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() <
				10 ? '0' + date.getSeconds() : date.getSeconds());
	}

}
/* 
 * 时间格式化 时分秒
 * time	
 * 返回 01:34:09
 * 調用formmatTime(new Date())
 */
function formmatTime(time, boolean) {
	if (boolean == true) {
		var date = new Date(time);
		return (date.getHours() < 10 ? '0' + date.getHours() :
			date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
	} else {
		var date = new Date(time);
		return (date.getHours() < 10 ? '0' + date.getHours() :
			date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() <
			10 ? '0' + date.getSeconds() : date.getSeconds());

	}

}
/**
 * 输入时间,返回时间或者近几天的描述性日期
 * timeStr 2019-10-30
 * 返回 今天 明天 后天 昨天  前天 2019-11-02
 * 调用 getMinusDay('2019-11-02')
 */
function getMinusDay(timeStr) {
	var date = new Date();
	var n = date.getFullYear() + "-" + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + "-" + (
		date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
	var t = new Date(timeStr).getTime();
	var now = new Date(n).getTime();
	var p = parseInt((now - t) / (1000 * 60 * 60 * 24));
	if (p == 0) {
		return '今天';
	} else if (p == -1) {
		return '明天';
	} else if (p == -2) {
		return '后天';
	} else if (p == 1) {
		return '昨天';
	} else if (p == 2) {
		return '前天';
	} else {
		return timeStr;
	}
}
/**
 * 计算两个日期之间的天数
 * dateStr1, dateStr2 2019-10-30 2019-11-01
 * 返回 天数
 * 调用 lyhGanttuDateDiff('2019-10-30','2019-11-05')
 */
function lyhGanttuDateDiff(dateStr1, dateStr2) { //sDate1和sDate2是2006-12-18格式  
	var dateSpan,
		tempDate,
		iDays;
	dateStr1 = Date.parse(dateStr1);
	dateStr2 = Date.parse(dateStr2);
	dateSpan = dateStr2 - dateStr1;
	dateSpan = Math.abs(dateSpan);
	iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
	return iDays
}

/**
 * 选择今天或明天等显示具体的年月日
 * key-today
 * el DOM元素
 * 返回 年月日-2019-10-30
 * 调用
 * <div><input type="text"></div>
 * <div><a href='#' onclick="timeChooseSimple('today',this)">[今天]</a></div>
 */
function timeChooseSimple(key, el) {
	var el = $(el);
	var input = el.parent().prev().find('input');
	if (key == 'today') { //今天
		var year = new Date().getFullYear();
		var month = new Date().getMonth() + 1 <= 9 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
		var strDate = new Date().getDate() <= 9 ? '0' + new Date().getDate() : new Date().getDate();
		var time = year + '-' + month + '-' + strDate;
		console.log(time);
	} else if (key == 'tomorrow') {
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		var year = tomorrow.getFullYear();
		var month = tomorrow.getMonth() + 1 <= 9 ? '0' + (tomorrow.getMonth() + 1) : tomorrow.getMonth() + 1;
		var strDate = tomorrow.getDate() <= 9 ? '0' + tomorrow.getDate() : tomorrow.getDate();
		var time = year + '-' + month + '-' + strDate;
	} else if (key == 'before') { //前天
		var before = new Date();
		before.setDate(before.getDate() - 2);
		var year = before.getFullYear();
		var month = before.getMonth() + 1 <= 9 ? '0' + (before.getMonth() + 1) : before.getMonth() + 1;
		var strDate = before.getDate() <= 9 ? '0' + before.getDate() : before.getDate();
		var time = year + '-' + month + '-' + strDate;
	} else if (key == 'after') { //后天
		var after = new Date();
		after.setDate(after.getDate() + 2);
		var year = after.getFullYear();
		var month = after.getMonth() + 1 <= 9 ? '0' + (after.getMonth() + 1) : after.getMonth() + 1;
		var strDate = after.getDate() <= 9 ? '0' + after.getDate() : after.getDate();
		var time = year + '-' + month + '-' + strDate;
	} else if (key == 'yesterday') { //昨天
		var yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		var year = yesterday.getFullYear();
		var month = yesterday.getMonth() + 1 <= 9 ? '0' + (yesterday.getMonth() + 1) : yesterday.getMonth() + 1;
		var strDate = yesterday.getDate() <= 9 ? '0' + yesterday.getDate() : yesterday.getDate();
		var time = year + '-' + month + '-' + strDate;
	} else if (key == 'thisWeek') { //周五
		var day = new Date().getDay(); //0=周日,
		var minus = 5 - day;
		var thisWeek = new Date();
		thisWeek.setDate(thisWeek.getDate() + minus);
		var year = thisWeek.getFullYear();
		var month = thisWeek.getMonth() + 1 <= 9 ? '0' + (thisWeek.getMonth() + 1) : thisWeek.getMonth() + 1;
		var strDate = thisWeek.getDate() <= 9 ? '0' + thisWeek.getDate() : thisWeek.getDate();
		var time = year + '-' + month + '-' + strDate;
	} else if (key == 'nextWeek') { //下周五
		var day = new Date().getDay(); //0=周日,
		var minus = 5 - day;
		var nextWeek = new Date();
		nextWeek.setDate(nextWeek.getDate() + minus + 7);
		var year = nextWeek.getFullYear();
		var month = nextWeek.getMonth() + 1 <= 9 ? '0' + (nextWeek.getMonth() + 1) : nextWeek.getMonth() + 1;
		var strDate = nextWeek.getDate() <= 9 ? '0' + nextWeek.getDate() : nextWeek.getDate();
		var time = year + '-' + month + '-' + strDate;
	}
	input.val(time);
	return time;
}
/**
 * 计算两个日期之间的分钟数
 * time1,time2分别是开始和结束时间
 * el DOM元素
 * 返回 分钟数
 * 调用 dxmTimeDifference(time1,time2);
 */
function dxmTimeDifference(time1, time2) {
	//判断开始时间是否大于结束日期
	if (time1 > time2) {
		console.log("开始时间不能大于结束时间！");
		return false;
	}
	//截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组
	var begin1 = time1.substr(0, 10).split("-");
	var end1 = time2.substr(0, 10).split("-");
	//将拆分的数组重新组合，并实例成化新的日期对象
	var date1 = new Date(begin1[1] + - +begin1[2] + - +begin1[0]);
	var date2 = new Date(end1[1] + - +end1[2] + - +end1[0]);
	//得到两个日期之间的差值m，以分钟为单位
	//Math.abs(date2-date1)计算出以毫秒为单位的差值
	//Math.abs(date2-date1)/1000得到以秒为单位的差值
	//Math.abs(date2-date1)/1000/60得到以分钟为单位的差值
	var m = parseInt(Math.abs(date2 - date1) / 1000 / 60);
	//小时数和分钟数相加得到总的分钟数
	//time1.substr(11,2)截取字符串得到时间的小时数
	//parseInt(time1.substr(11,2))*60把小时数转化成为分钟
	var min1 = parseInt(time1.substr(11, 2)) * 60 + parseInt(time1.substr(14, 2));
	var min2 = parseInt(time2.substr(11, 2)) * 60 + parseInt(time2.substr(14, 2));
	//两个分钟数相减得到时间部分的差值，以分钟为单位
	var n = min2 - min1;
	//将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
	var minutes = m + n;
	return minutes;
}
/**
 * 计算两个日期之间的显示为x天x小时x分x秒
 * startTime,endTime分别是开始和结束时间
 * el DOM元素
 * 返回 x天x小时x分x秒
 * 调用 dxmCalculateDiffTime (startTime,endTime);
 */
function dxmCalculateDiffTime(startTime, endTime) {
	var s1 = new Date(startTime),
		s2 = new Date(endTime),
		runTime = parseInt((s2.getTime() - s1.getTime()) / 1000);
	var day = Math.floor(runTime / 86400);
	runTime = runTime % 86400;
	var hour = Math.floor(runTime / 3600);
	runTime = runTime % 3600;
	var minute = Math.floor(runTime / 60);
	runTime = runTime % 60;
	var second = runTime;
	var d = 0;
	var time = "";
	if (day > 0) {
		time = day + "天" + hour + "小时" + minute + "分" + second + '秒'
	} else {
		time = hour + "小时" + minute + "分" + second + '秒'
	}
	return time;
}
/* 
 * 字符串替换 you -> me
 * s1	被替换字符串
 * s2 	替换字符串
 * 调用 str.replaceAll("you","me");
 */
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}
/* 
 * 深度拷贝
 * obj arr
 * 调用 b =deepClone(a)
 */
function deepClone(obj) {
	let _obj = JSON.stringify(obj),
		objClone = JSON.parse(_obj);
	return objClone;
}
/* 
 * 深度比较数组
 * arr
 * 调用 isArrayEqual(a, b)
 */
function isArrayEqual(arrya1, array2) {
	if (!arrya1 || !array2)
		return false;
	// 比较长度
	if (arrya1.length != array2.length)
		return false;
	for (let i = 0, l = arrya1.length; i < l; i++) {
		// 检查是否是嵌套数组
		if (arrya1[i] instanceof Array && array2[i] instanceof Array) {
			// 这里递归判断嵌套数组
			if (!isArrayEqual.call(this, arrya1[i], array2[i]))
				return false;
		} else if (arrya1[i] != array2[i]) {
			// 注意: {x:20} != {x:20}对象不等于对象
			return false;
		}
	}
	return true;
}
/* 
 * 深度比较对象
 * obj
 * 调用 isObjectEqual(c, d)
 */
function isObjectEqual(object1, object2) {
	//首先检查对象的类型
	for (let propName in object1) {
		//是否拥有相同的属性
		if (object1.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
			return false;
		}
		//检查实例的类型
		else if (typeof object1[propName] != typeof object2[propName]) {
			return false;
		}
	}
	//检车对象是否有更深的属性
	for (let propName in object2) {
		//检查对象的原型链属性
		if (object1.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
			return false;
		} else if (typeof object1[propName] != typeof object2[propName]) {
			return false;
		}
		//如果属性是从原型链继承的
		if (!object1.hasOwnProperty(propName))
			continue;
		//如果实例是数组
		if (object1[propName] instanceof Array && object2[propName] instanceof Array) {
			// 使用上面比较数组的方法
			if (!isArrayEqual.call(this, object1[propName], object2[propName]))
				return false;
		} else if (object1[propName] instanceof Object && object2[propName] instanceof Object) {
			if (!isObjectEqual.call(this, object1[propName], object2[propName]))
				return false;
		}
		//正常比较两个值
		else if (object1[propName] != object2[propName]) {
			return false;
		}
	}
	//所有事情都没有则可以使用
	return true;
}
/* 
 * 是否为空 true=空 false=非空
 * obj arr string
 * 调用 isEmpty(parm)
 */
function isEmpty(parm) {
	if (typeof(parm) == 'string') {
		if (parm == null || parm == 'null' || parm == undefined || parm == 'undefined' || parm.match(/^[\s]*$/)) {

			return true;

		} else {

			return false;

		}

	} else if (typeof(parm) == 'object') {
		var t;

		for (t in parm) {

			return !1;

		}

		return !0
	}
}
/* 
 * 判断json的某个属性是否为空 true=空 false=非空
 * obj 对象
 * key	属性
 * 调用 isEmptyJsonKey(obj, key)
 */
function isEmptyJsonKey(obj, key) {
	return !obj.hasOwnProperty(key);
}
/* 
 * 判断json的某个属性的值是否为空 true=空 false=非空
 * obj 对象
 * key	属性
 * 调用 isEmptyJsonKeyVal(obj, key)
 */
function isEmptyJsonKeyVal(obj, key) {
	if (obj.hasOwnProperty(key)) {
		return isEmpty(obj[key])
	} else {
		return false;
	}
}
/* 
 * url参数值
 * 调用 getQueryString('参数名')
 */
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}

/* 
 * 检查对象是否为空对象
 */
function isEmptyObject(obj) {
	return (JSON.stringify(obj) == "{}");
}
/**
 * uuid
 */
function uuid(len, radix) {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [],
		i;
	radix = radix || chars.length;
	if (len) {
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {
		var r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	return uuid.join('');
}
