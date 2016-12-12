/**
 * @info	织麦麦红白袜子
 * @date    2014-09-18
 * @author	dongjianghao
**/

// 图片数据
var imgData = [
	{'url':'img/snow_bg.png'},
	{'url':'img/tree.png'},
	{'url':'img/bg01.png'},
	{'url':'img/christmas_spirit.png'},
	{'url':'img/bg02.png'},
	{'url':'img/bg03.png'},
	{'url':'img/line1.png'},
	{'url':'img/line2.png'},
	{'url':'img/rank.png'}
];

// 定时器对象
var timer = {
	countN : null,
	countT : null
}

// 全局参数
var cdNum = 3,		// 倒计时3,2,1
	_time  = 1200;	// 20秒倒计时 1200

// 元素
var countDownNum = null,
	countTime 	 = null,
	yarnWrap     = null,
	scoreNum	 = 0,
	oScore       = 0;

Mcdonald = {
	init : function(){
		// 加载图片loading方法
		this.loadImg(imgData);
	},
	ready : function(){
		var self = this;
		$(function(){
			countDownNum = $('#countDown');
			countTime    = $('#time var');
			yarnWrap     = $('#yarn_m');
			oScore		 = $('#grade>var');
			self.startGame();
			// 取消默认事件
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		});
	},
	loadImg : function(imgData){
		var self = this;
		var l=imgData.length;
		var Domhtml='';
		var jd=0;
		$.each(imgData,function(i){
			var newImg=new Image();
			newImg.onload = newImg.onerror =function(){
				jd+=100/l
				$('#loadingNum').html(parseInt(jd));
				if(jd>99){
					$('#loadingNum').html(100);
					setTimeout(function(){
						$('#loading').hide();
						$('#startPage').show();
						self.ready();
					},300)
				};
			}
			newImg.src=imgData[i].url;
		})
	},
	startGame : function(){
		var self = this;
		$('#startGameBtn').on('touchstart',function(){
			// 添加当前状态 - game 类
			$('body').attr('class','game');
			$('#gamePage').show();
			// 隐藏元素
			$('#startPage .center,#startPage header,#startPage .text,#startGameBtn,#startPage .socks_text,.santa_claus').animate({
				'opacity':0
			},'ease',300);
			setTimeout(function(){
				self.readyStart();
			},2500)
		});
	},
	readyStart : function(){
		var self = this;
		// 点击准备开始游戏
		$('#gamePage').one('touchstart',function(){
			// 隐藏手指
			$('#startPage .socks').css('opacity',0);
			$('#leftfinger,#rightfinger').css('display','none');
			// 变换线段
			$('#gamePage .line').addClass('line1');
			// 添加当前状态 - game 类
			$('body').attr('class','gaming');
			// 长袜子上移、并执行倒计时
			setTimeout(function(){
				$('#lSocks').animate({
					'top':'-106px'
				},'ease',2000,function(){
					self.countDown();
				})
			},1000);
		});
	},
	countDown : function(){
		var self = this;
		$('#countDown').show();
		$('#gamePage').find('.line').hide();
		$('#game_line').fadeIn();
		$('#redyarn_rdnum').html('×<var>'+rNum()+'</var>');
		timer.countN = setInterval(function(){
			cdNum--;
			if(cdNum < 0) {
				clearInterval(timer.countN);
				_switch = true;
				// goCountDown();
				countDownNum.remove();
				self.begin();
				return;
			}
			countDownNum.html(cdNum);
		},1000)
	},
	begin : function(){
		var self = this;
		// 20s倒计时
		timer.countT = setInterval(function(){
			_time --;
			var Seconds=parseInt(_time/60);
			var Millisecond=_time%60;
			if(Seconds<10){
				Seconds='0'+Seconds;
			}
			if(Millisecond<10){
				Millisecond='0'+Millisecond;
			}
			if(_time == 0) {
				clearInterval(timer.countT)
				countTime.html(Seconds+'\"'+Millisecond);
				// 百分比
				// scoreNum 成绩
				var percentNum;
				// 隐藏游戏模块，销毁事件
				$('#game_line').hide();
				$('#lSocks').animate({
					'top': -999
				});
				$('#yarn_m').find('div').unbind();
				$('#yarn_mask').unbind();
				$('#endGameTitle').animate({'top': 108 },'ease',300);
				// 时间到，进入游戏结果页
				setTimeout(function(){
					self.endGame()
				},2000)

				// window.shareData.tTitle = '麦当劳叔叔红白袜我织了'+scoreNum+'cm，打败全国'+percentNum+'%的人！'
				window.shareData.tTitle = '我织了'+scoreNum+'cm暖暖的麦麦红白袜，你呢？';
				/*// 执行本地储存
				if(window.localStorage){
 					localStorage.scoreNum = scoreNum;
 					localStorage.percentNum = percentNum;
				}
				console.log(localStorage);*/
				return;
			}
			countTime.html(Seconds+'\"'+Millisecond);
		},20);
		// 点击线团
		yarnWrap.find('div').each(function(){
			$(this).on('touchstart',function(){
				var _this = $(this),
					tId = _this.attr('data-id')+'_rdnum',
					rId = _this.siblings().attr('data-id')+'_rdnum',
					_state = parseInt(_this.attr('data-state')),
					_index = $(this).index();
				if(_state){
					var num = parseInt($('#'+tId).find('var').html());
					scoreNum ++;
					num --;
					oScore.html(scoreNum);
					var _l = $('#'+tId).offset().left + rNum()*10,
						_t = $('#'+tId).offset().top - rNum()*10;
						$('#heart').remove();
						$('body').append('<div id="heart" class="'+tId+'"></div>');
						$('#heart').css({
							'left':_l+'px',
							'top':_t+'px'
						}).animate({
							'top' : _t -100 + 'px',
							'opacity' : 0
						},'ease',300,function(){
							$('#heart').remove();
						});
					// 线针抖动
					$('#needle').find('div').eq(_index).animate({
						'-webkit-transform':'translateY(30px)'
					},'ease',300);

					if(num == 0){
						_this.attr('data-state','0').removeClass('active');
						$('#'+tId).removeClass('active');
						_this.siblings().attr('data-state','1').addClass('active');
						$('#'+rId).addClass('active').html('×<var>'+rNum()+'</var>');
						$('#'+tId).html('');
						$('#game_line').attr('class',rId);
						$('#yarn_mask').attr('class',tId);
						return;
					}
					$('#'+tId).find('var').html(num);
				}else{
					scoreNum --;
					if(scoreNum <= 0){
						scoreNum = 0;
					}
					oScore.html(scoreNum);
				}
			}).on('touchend',function(){
				var _index = $(this).index();
				$('#needle').find('div').eq(_index).animate({
					'-webkit-transform':'translateY(0)'
				},'ease',300);
			});
		});
	},
	endGame : function(){
		// 成绩
		$('#resultNum').html(oScore);

		$.ajax({
            type: 'POST',
            url: '../default.php',
            data:{score:scoreNum},
            dataType:'json',
            success: function(strs) {
                if(strs.error == 0){
                   var percentNum = strs.data;//打败了多少人。
                   var imgs = strs.img

                    window.shareData.tTitle = '麦当劳叔叔红白袜我织了'+scoreNum+'cm，打败全国'+percentNum+'%的人！';

                    // 打败了百分之多少人
                    $('#resultPercent').html(percentNum+'%');

                    $('#imgs').attr('src','http://mcdonald.qiniudn.com/img/'+imgs+'.png');
                    // 执行本地储存
					if(window.localStorage){
	 					localStorage.scoreNum = scoreNum;
	 					localStorage.percentNum = percentNum;
					}
					//console.log(localStorage);
               
				}
            }
        })
		
		// 打败了百分之多少人
		//$('#resultPercent').html('99%');
		// 收回"时间到"
		$('#endGameTitle').animate({'top': -999 },'ease',300);
		// 隐藏毛线团、针、头部计时条
		$('#yarn,#yarn_m,#needle,#integralBar').fadeOut();
		// 显示结果页
		$('#resultPage').fadeIn();
		// 显示袜子模块
		$('#startPage .socks').css({
			'top' : 182,
			'-webkit-transform' : 'scale(1.1,1.1)',
			'opacity':1
		});
		// 显示底部模块
		// $('#startPage header').show().css({
		// 	'opacity':1,
		// 	'position':'absolute',
		// 	'bottom':33,
		// 	'left':0,
		// 	'width':'100%'
		// });
		// 点击显示、关闭分享
		$('#share').on('touchstart',function(e){
			$('#resultPage').addClass('active');
			$('#resultTop').css('opacity',0);
			$('#startPage header').show().css({
				'opacity':1,
				'position':'absolute',
				'bottom':33,
				'left':0,
				'width':'100%'
			});
		});
		$('#resultShare').on('touchstart',function(){
			$('#resultPage').removeClass('active');
			$('#resultTop').css('opacity',1);
			$('#startPage header').show().hide();
		});
	}
}

// 随机数
function rNum(){
	return Math.floor(Math.random()*(parseInt(10))) || 1;
}

// 初始化
Mcdonald.init();