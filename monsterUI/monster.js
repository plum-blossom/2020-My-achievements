$(function() {
	// 密码显示隐藏
	$('.input-password .icon').click(function() {
		var isShow = $(this).hasClass("icon-eye-open");
		if (isShow) { //点击隐藏
			$(this).removeClass('icon-eye-open').addClass("icon-eye-close").siblings("input").attr("type", "password");
		} else { //点击显示
			$(this).removeClass('icon-eye-close').addClass("icon-eye-open").siblings("input").attr("type", "text");
		}
	})
	// 清空input
	$('.clear .icon').click(function() {
		$(this).siblings("input").val("");
	})
	// $('.input-container').on('.error input','focus',function(){
	$(".error input").focus(function(){
		console.log(23)
		$(this).parent().removeClass('error');
		$('.tip-error').hide();
		
		$(this).unbind().blur(function(){
			var value = $(this).val();
			if(!value){
				$(this).parent().addClass('error');
				// $(this).focus();
			}
		})
		
	})
	// 进度条控制
	$('.progressBar-item').each(function(){
		var percentage = $(this).siblings().text();
		$(this).find('.progressBar').css("width",percentage);
	})
	$('.progressBar-item-v').each(function(){
		var percentage = $(this).siblings().text();
		$(this).find('.progressBar').css("height",percentage);
	})
	// 环形进度条
	$('.progressCircle-container').each(function(index, el) {
		var num = $(this).find('span').text() * 3.6;
		if (num <= 180) {
			$(this).find('.right').css('transform', "rotate(" + (num - 180) + "deg)");
		} else {
			$(this).find('.right').css('transform', "rotate(0deg)");
			$(this).find('.left').css('transform', "rotate(" + (num - 360) + "deg)");
		};
	});
})
// 模态窗
function layerTipsTool(msg, time, icon) {
	$('body').append(
		`<div class="layer-tips">
					<div class="layer-tips-content icon-box">
						<span class="icon ${icon}">${icon == "warning" ? "!" : ""}</span>${msg}
					</div>
				</div>`
	)
	clearTimeout(timer);
	var timer = setTimeout(function() {
		$('.layer-tips').fadeOut(3000).remove();
	}, time)
}

function layerConfrimTool(type, title, msg, btn, icon, confirmCallback,cancelCallback) {
	var html = "";
	if (type == 1) {
		html +=
			`<div class="layer-confrim">
					<div class="layer-confrim-content icon-box">
						<div class="title">
							<p class="text">${title}</p>
							<span class="icon close-layer"></span>
						</div>
						<div class="content">
							<div class="desc"><span class="icon"></span>${msg}</div>
							<div class="layer-btn"><button type="button" class="btn btn-primary close-layer">确认</button></div>
						</div>
					</div>
				</div>`;
	} else if (type == 2) {
		html +=
			`<div class="layer-confrim">
					<div class="layer-confrim-content icon-box">
						<div class="title">
							<p class="text">${title}</p>
							<span class="icon close-layer"></span>
						</div>
						<div class="content">
							<div class="desc"><span class="icon ${icon}">${icon == "warning" ? "!" : ""}</span>${msg}</div>
							<div class="layer-btn"><button type="button" class="btn btn-default layer-btn0 close-layer">${btn[0]}</button><button type="button" class="btn btn-primary">${btn[1]}</button></div>
						</div>
					</div>
				</div>`;
	}
	$('body').append(html);
	$('.close-layer').click(function() {
		$(this).parents('.layer-confrim').fadeOut(3000).remove();
	})
	$('.layer-btn button:eq(0)').click(function() {
		cancelCallback ? cancelCallback() : "";
	})
	$('.layer-btn button:eq(1)').click(function() {
		confirmCallback ? confirmCallback() :"";
		$(this).parents('.layer-confrim').fadeOut(3000).remove();
	})
}
// 带有搜索筛选的select
(function($) {
	$.selectSuggest = function(target, data, itemSelectFunction) {
		var defaulOption = {
			suggestMaxHeight: '100%',
			itemColor: '#4A4A4A',
			itemBackgroundColor: '#fff',
			itemOverColor: '#4A4A4A',
			itemOverBackgroundColor: '#DDDEE2',
			itemPadding: 3,
			fontSize: 12,
			alwaysShowALL: true
		};
		var maxFontNumber = 0;
		var currentItem;
		var suggestContainerId = target + "-suggest";
		var suggestContainerWidth = $('#' + target).innerWidth();
		var suggestContainerLeft = $('#' + target).offset().left;
		var suggestContainerTop = $('#' + target).offset().top + $('#' + target).outerHeight();
		var showClickTextFunction = function() {
			var id = $(this).attr('id');
			$('#' + target).val(this.innerText);
			$('#' + target).attr('data-select',id);
			currentItem = null;
			$('#' + suggestContainerId).hide();
			$('#' + target).siblings('i').removeClass('icon-up').addClass("icon-down");
		}
		var suggestContainer;
		if ($('#' + suggestContainerId)[0]) {
			suggestContainer = $('#' + suggestContainerId);
			suggestContainer.empty();
		} else {
			suggestContainer = $('<ul class="select-list"></ul>');
		}
		suggestContainer.attr('id', suggestContainerId);
		suggestContainer.attr('tabindex', '0');
		suggestContainer.hide();
		var _initItems = function(items) {
			suggestContainer.empty();
			for (var i = 0; i < items.length; i++) {
				if (items[i].text.length > maxFontNumber) {
					maxFontNumber = items[i].text.length;
				}
				var suggestItem = $('<li></li>');
				suggestItem.attr('id', items[i].id);
				suggestItem.append(items[i].text);
				suggestItem.css({
					'padding': defaulOption.itemPadding + 'px',
					'white-space': 'nowrap',
					'cursor': 'pointer',
					'background-color': defaulOption.itemBackgroundColor,
					'color': defaulOption.itemColor,
					'line-height':'40px',
					'padding-left':'20px'
				});
				suggestItem.bind("mouseover", function() {
					$(this).css({
						'background-color': defaulOption.itemOverBackgroundColor,
						'color': defaulOption.itemOverColor
					});
					currentItem = $(this);
				});
				suggestItem.bind("mouseout", function() {
					$(this).css({
						'background-color': defaulOption.itemBackgroundColor,
						'color': defaulOption.itemColor
					});
					currentItem = null;
				});
				suggestItem.bind("click", showClickTextFunction);
				suggestItem.bind("click", itemSelectFunction);
				suggestItem.appendTo(suggestContainer);
				suggestContainer.appendTo(document.body);
			}
		}
		var inputChange = function() {
			var inputValue = $('#' + target).val();
			inputValue = inputValue.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
			var matcher = new RegExp(inputValue, "i");
			return $.grep(data, function(value) {
				return matcher.test(value.text);
			});
		}
		$('#' + target).bind("keyup", function() {
			_initItems(inputChange());
		});
		$('#' + target).siblings('i').click(function() {
			var isDown = $(this).hasClass("icon-down");
			if (isDown) {
				$(this).removeClass('icon-down').addClass("icon-up");
				$('#' + target).click();
			} else {
				
				$('#' + suggestContainerId).hide();
			}
		})
		$('#' + target).bind("blur", function() {
			if (!$('#' + suggestContainerId).is(":focus")) {
				$('#' + suggestContainerId).hide();
				$(this).siblings('i').removeClass('icon-up').addClass("icon-down");
				if (currentItem) {
					currentItem.trigger("click");
				}
				currentItem = null;
				return;
			}
		});
		$('#' + target).bind("click", function() {
			$(this).siblings('i').removeClass('icon-down').addClass("icon-up");
			if (defaulOption.alwaysShowALL) {
				_initItems(data);
			} else {
				_initItems(inputChange());
			}
			$('#' + suggestContainerId).removeAttr("style");
			var tempWidth = defaulOption.fontSize * maxFontNumber + 2 * defaulOption.itemPadding + 30;
			var containerWidth = Math.max(tempWidth, suggestContainerWidth);
			$('#' + suggestContainerId).css({
				'box-shadow':'0px 0px 4px 0px rgba(0,0,0,0.2)',
				'border-radius':'4px 0px 0px 0px',
				'margin-top':'10px',
				'max-height': '200px',
				'top': suggestContainerTop,
				'left': suggestContainerLeft,
				'width': suggestContainerWidth,
				'position': 'absolute',
				'font-size': defaulOption.fontSize + 'px',
				'font-family': 'MicrosoftYaHei',
				'z-index': 99999,
				'background-color': '#FFFFFF',
				'overflow-y': 'auto',
				'overflow-x': 'hidden',
				'white-space': 'nowrap'
			});
			$('#' + suggestContainerId).show();
		});
		_initItems(data);
		$('#' + suggestContainerId).bind("blur", function() {
			$('#' + suggestContainerId).hide();
			
		});
	}
})(jQuery);
