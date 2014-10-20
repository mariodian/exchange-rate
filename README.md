jQuery Exchange Rate
====================

Simple plugin that displays current exchange rate over a price.

It has no external dependencies other than jQuery.

##How to Use##

Include css inside a head element:

    <link rel="stylesheet" href="jquery.exchange-rate.min.css">
Include javascript inside a head element:

    <script src="jquery.exchange-rate.min.js"></script>

Load the plugin:

    <script>
    $(document).ready(function(){
      $('.rate').exchangeRate({
        margin: 8,
        insertBefore: '<div class="rate-icons"></div>'
      });
    });
    </script>
  
Add little bit of html where tags would be inserted:

    <a href="#" class="rate" data-from="BTC" data-to="EUR">150 BTC</a>
  
##Parameters##

**updateInterval** [default: 3600] - number of seconds how long is the rate cached

**margin** [default: 10] - bottom margin

**insertBefore** - element inserted at the beginning of the box

**insertAfter** - element inserted at the end of the box
