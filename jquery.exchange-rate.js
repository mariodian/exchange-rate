/**
*	Show exchange rate for pair of currencies
**/
$.fn.exchangeRate = function(options){	
	var settings = $.extend({
		updateInterval: 3600, // every hour
		margin: 10,
		wrapBefore: '',
		wrapAfter: ''
	}, options);

	Number.prototype.formatMoney = function(c, d, t){
		var n = this, 
			c = isNaN(c = Math.abs(c)) ? 2 : c, 
			d = d == undefined ? "." : d, 
			t = t == undefined ? "," : t, 
			s = n < 0 ? "-" : "", 
			i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
			j = (j = i.length) > 3 ? j % 3 : 0;
			
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	 };

	$.fn.positionBubble = function(el){
		var position = $(el).position();
		
		$(this).css('top', position.top - settings.margin - $(this).outerHeight());
		$(this).css('left', position.left + (($(el).outerWidth() - $(this).outerWidth())/2));
	}

	$.fn.displayRateInfo = function(rate){
		var fromAmount = parseFloat($(this).text()),
			toAmount = (fromAmount * rate).formatMoney(2, ',', ' '),
			currency = $(this).data('to');
		
		$('.rate-bubble').find('p').html(toAmount + ' ' + currency);
		$('.rate-bubble-wrapper').positionBubble(this);
	}
	
	/**
	*	Display exchange rate bubble
	**/
	$.fn.displayBubble = function(){
		var self = this,
			currencyFrom = $(this).data('from').toUpperCase(),
			currencyTo = $(this).data('to').toUpperCase(),
			rate = parseFloat($(this).data('rate'));
		
		$(this).after('<div class="rate-bubble-wrapper"><div class="rate-bubble clearfix">' + settings.wrapBefore + '<p>fetching...</p>' + settings.wrapAfter + '</div><div class="rate-bubble-arrow"></div></div>');
		
		$('.rate-bubble-wrapper').positionBubble(self);
			
		if( currencyFrom && currencyTo )
		{
			var lastUpdate = $(this).data('last-update'),
				currentTime = new Date().valueOf();
				
			if( !lastUpdate || (lastUpdate + settings.updateInterval * 1000) < currentTime )
			{
				$(this).data('last-update', currentTime);
		
				$.ajax({
					type: 'GET',
					url: "http://query.yahooapis.com/v1/public/yql?q=select+rate,name+from+csv+where+url='http://download.finance.yahoo.com/d/quotes?s=" + currencyFrom + currencyTo + "%253DX%26f%3Dl1n'+and+columns='rate,name'&format=json",
					dataType: 'json',
					
					success: function(json){
						$(self).data('rate', json.query.results.row.rate);
						
						rate = parseFloat($(self).data('rate'));
					
						$(self).displayRateInfo(rate);
					}
				});
			}
			else
			{
				$(this).displayRateInfo(rate);
			}
		}
	}

	// Disable AJAX caching because of Firefox
	$.ajaxSetup({
		cache: false
	});
	
	$(this).click(function(event){
		event.preventDefault();
	});
	$(this).mouseenter(function(event){
		$(this).displayBubble();
	});
	$(this).mouseleave(function(event){
		$('.rate-bubble-wrapper').remove();
	});
};