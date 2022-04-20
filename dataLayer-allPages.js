<script>

if(!window.jQuery){
    var jqueryScript = document.createElement('script');
    jqueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'); 
    document.head.appendChild(jqueryScript); 
}

__DL__jQueryinterval = setInterval(function(){
    // wait for jQuery to load & run script after jQuery has loaded
    if(window.jQuery){
        // search parameters
        getURLParams = function(name, url){
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        };
        
        /**********************
        * DYNAMIC DEPENDENCIES
        ***********************/
        
        __DL__ = {
            dynamicCart: true,  // if cart is dynamic (meaning no refresh on cart add) set to true
            debug: false, // if true, console messages will be displayed
            cart: null,
            wishlist: null,
            removeCart: null
        };
        
        customBindings = {
            cartTriggers: [],
            viewCart: [],
            removeCartTrigger: [],
            cartVisableSelector: [],
            promoSubscriptionsSelectors: [],
            promoSuccess: [],
            ctaSelectors: [],
            newsletterSelectors: [],
            newsletterSuccess: [],
            searchPage: [],
            wishlistSelector: [],
            removeWishlist: [],
            wishlistPage: [],
            searchTermQuery: [getURLParams('q')], // replace var with correct query
        };
        
        /* DO NOT EDIT */
        defaultBindings = {
            cartTriggers: ['form[action="/cart/add"] [type="submit"],.add-to-cart,.cart-btn'],
            viewCart: ['form[action="/cart"],.my-cart,.trigger-cart,#mobileCart'],
            removeCartTrigger: ['[href*="/cart/change"]'],
            cartVisableSelector: ['.inlinecart.is-active,.inline-cart.is-active'],
            promoSubscriptionsSelectors: [],
            promoSuccess: [],
            ctaSelectors: [],
            newsletterSelectors: ['input.contact_email'],
            newsletterSuccess: ['.success_message'],
            searchPage: ['search'],
            wishlistSelector: [],
            removeWishlist: [],
            wishlistPage: []
        };
        
        // stitch bindings
        objectArray = customBindings;
        outputObject = __DL__;
        
        applyBindings = function(objectArray, outputObject){
            for (var x in objectArray) {  
                var key = x;
                var objs = objectArray[x]; 
                values = [];    
                if(objs.length > 0){    
                    values.push(objs);
                    if(key in outputObject){              
                        values.push(outputObject[key]); 
                        outputObject[key] = values.join(", "); 
                    }else{        
                        outputObject[key] = values.join(", ");
                    }   
                }  
            }
        };
        
        applyBindings(customBindings, __DL__);
        applyBindings(defaultBindings, __DL__);
        
        /**********************
        * PREREQUISITE LIBRARIES 
        ***********************/
        
        clearInterval(__DL__jQueryinterval);
        
        // jquery-cookies.js
        if(typeof $.cookie!==undefined){
            (function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else if(typeof exports==='object'){module.exports=a(require('jquery'))}else{a(jQuery)}}(function($){var g=/\+/g;function encode(s){return h.raw?s:encodeURIComponent(s)}function decode(s){return h.raw?s:decodeURIComponent(s)}function stringifyCookieValue(a){return encode(h.json?JSON.stringify(a):String(a))}function parseCookieValue(s){if(s.indexOf('"')===0){s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\')}try{s=decodeURIComponent(s.replace(g,' '));return h.json?JSON.parse(s):s}catch(e){}}function read(s,a){var b=h.raw?s:parseCookieValue(s);return $.isFunction(a)?a(b):b}var h=$.cookie=function(a,b,c){if(arguments.length>1&&!$.isFunction(b)){c=$.extend({},h.defaults,c);if(typeof c.expires==='number'){var d=c.expires,t=c.expires=new Date();t.setMilliseconds(t.getMilliseconds()+d*864e+5)}return(document.cookie=[encode(a),'=',stringifyCookieValue(b),c.expires?'; expires='+c.expires.toUTCString():'',c.path?'; path='+c.path:'',c.domain?'; domain='+c.domain:'',c.secure?'; secure':''].join(''))}var e=a?undefined:{},cookies=document.cookie?document.cookie.split('; '):[],i=0,l=cookies.length;for(;i<l;i++){var f=cookies[i].split('='),name=decode(f.shift()),cookie=f.join('=');if(a===name){e=read(cookie,b);break}if(!a&&(cookie=read(cookie))!==undefined){e[name]=cookie}}return e};h.defaults={};$.removeCookie=function(a,b){$.cookie(a,'',$.extend({},b,{expires:-1}));return!$.cookie(a)}}))}
        
        /**********************
        * Begin dataLayer Build 
        ***********************/
        
        window.dataLayer = window.dataLayer || [];  // init data layer if doesn't already exist

        var template = "{{template}}"; 
        
        /**
        * Landing Page Cookie
        * 1. Detect if user just landed on the site
        * 2. Only fires if Page Title matches website */
        
        $.cookie.raw = true;
        if ($.cookie('landingPage') === undefined || $.cookie('landingPage').length === 0) {
            var landingPage = true;
            $.cookie('landingPage', unescape);
            $.removeCookie('landingPage', {path: '/'});
            $.cookie('landingPage', 'landed', {path: '/'});
        } else {
            var landingPage = false;
            $.cookie('landingPage', unescape);
            $.removeCookie('landingPage', {path: '/'});
            $.cookie('landingPage', 'refresh', {path: '/'});
        }
        if (__DL__.debug) {
            console.log('Landing Page: ' + landingPage);
        }
        
        /** 
        * Log State Cookie */
        
        {% if customer %}
        var isLoggedIn = true;
        {% else %}
        var isLoggedIn = false;
        {% endif %}
        if (!isLoggedIn) {
            $.cookie('logState', unescape);
            $.removeCookie('logState', {path: '/'});
            $.cookie('logState', 'loggedOut', {path: '/'});
        } else {
            if ($.cookie('logState') === 'loggedOut' || $.cookie('logState') === undefined) {
                $.cookie('logState', unescape);
                $.removeCookie('logState', {path: '/'});
                $.cookie('logState', 'firstLog', {path: '/'});
            } else if ($.cookie('logState') === 'firstLog') {
                $.cookie('logState', unescape);
                $.removeCookie('logState', {path: '/'});
                $.cookie('logState', 'refresh', {path: '/'});
            }
        }
        
        if ($.cookie('logState') === 'firstLog') {
            var firstLog = true;
        } else {
            var firstLog = false;
        }
        
        /**********************
        * DATALAYER SECTIONS 
        ***********************/
        
        /**
        * DATALAYER: Landing Page
        * Fires any time a user first lands on the site. */
        
        if ($.cookie('landingPage') === 'landed') {
            dataLayer.push({
                'pageType': 'Landing',
                'event': 'first_time_visitor'
            });
        }
        
        /** 
        * DATALAYER: Log State
        * 1. Determine if user is logged in or not.
        * 2. Return User specific data. */
        
        var logState = {
            {% if shop.customer_accounts_enabled %}
            {% if customer %}
            'userId'        : {{customer.id | json}},
            'customerEmail' : {{customer.email | json}},
            'logState'      : "Logged In",
            'customerInfo'  : {
                'firstName'   : {{customer_address.first_name | json}},
                'lastName'    : {{customer_address.last_name | json}},
                'address1'    : {{customer_address.address1 | json}},
                'address2'    : {{customer_address.address2 | json}},
                'street'      : {{customer_address.street | json}},
                'city'        : {{customer_address.city | json}},
                'province'    : {{customer_address.province | json}},
                'zip'         : {{customer_address.zip | json}},
                'country'     : {{customer_address.country | json}},
                'phone'       : {{customer_address.phone | json}},
                'totalOrders' : {{customer.orders_count | json}},
                'totalSpent'  : {{customer.total_spent | money_without_currency | remove: "," | json}}
            },
            {% else %}
            'logState' : "Logged Out",
            {% endif %}
            {% endif %}
            'firstLog'      : firstLog,
            'customerEmail' : {{customer.email | json}},
            'timestamp'     : Date().replace(/\(.*?\)/g,''),  
            {% if customer.orders_count > 2 %}
            'customerType'       : 'Returning',
            'customerTypeNumber' : '0',
            {% else %}
            'customerType'       : 'New',
            'customerTypeNumber' :'1', 
            {% endif %}
            'shippingInfo' : {
                'fullName'  : {{checkout.shipping_address.name | json}},
                'firstName' : {{checkout.shipping_address.first_name | json}},
                'lastName'  : {{checkout.shipping_address.last_name | json}},
                'address1'  : {{checkout.shipping_address.address1 | json}},
                'address2'  : {{checkout.shipping_address.address2 | json}},
                'street'    : {{checkout.shipping_address.street | json}},
                'city'      : {{checkout.shipping_address.city | json}},
                'province'  : {{checkout.shipping_address.province | json}},
                'zip'       : {{checkout.shipping_address.zip | json}},
                'country'   : {{checkout.shipping_address.country | json}},
                'phone'     : {{checkout.shipping_address.phone | json}},
            },
            'billingInfo' : {
                'fullName'  : {{checkout.billing_address.name | json}},
                'firstName' : {{checkout.billing_address.first_name | json}},
                'lastName'  : {{checkout.billing_address.last_name | json}},
                'address1'  : {{checkout.billing_address.address1 | json}},
                'address2'  : {{checkout.billing_address.address2 | json}},
                'street'    : {{checkout.billing_address.street | json}},
                'city'      : {{checkout.billing_address.city | json}},
                'province'  : {{checkout.billing_address.province | json}},
                'zip'       : {{checkout.billing_address.zip | json}},
                'country'   : {{checkout.billing_address.country | json}},
                'phone'     : {{checkout.billing_address.phone | json}},
            },
            'checkoutEmail' : {{checkout.email | json}},
            'currency'      : {{shop.currency | json}},
            'pageType'      : 'Log State',
            'event'         : 'logState'
        }
        dataLayer.push(logState);

        /** 
        * DATALAYER: Homepage */
        
        if(document.location.pathname == "/"){
            dataLayer.push({
                'pageType' : 'Homepage',
                'event'    : 'homepage',
                logState
            });
        }
      
        /** 
        * DATALAYER: 404 Pages
        * Fire on 404 Pages */
      	{% if template contains '404' %}
            dataLayer.push({
                'event':'404',
                'page': window.location.pathname 
            });
      	{% endif %}

        /** 
        * DATALAYER: Blog Articles
        * Fire on Blog Article Pages */
        {% if template contains 'article' %}
            dataLayer.push({
                'author'      : {{article.author | json}},
                'title'       : {{article.title | json}},
                'dateCreated' : {{article.created_at | json}},
                'pageType'    : 'Blog',
                'event'       : 'blog'
            });
        {% endif %}
        
        /** DATALAYER: Product List Page (Collections, Category)
        * Fire on all product listing pages. */
        {% if template contains 'collection' %}
            var ecommerce = {
                'items': [
                    {% for product in collection.products %}{
                        'item_id'        : {{product.id | json}},                  
                        'item_variant'    : {{product.selected_variant.title | json}},             
                        'item_name'      : {{product.title | json}},
                        'price'           : {{product.price | money_without_currency | replace: ',', '.' | json}},
                        'item_brand'      : {{product.vendor | json}},
                        'item_category'   : {{product.type | json}},
                        'item_list_name'  : {{collection.title | json}},
                        'imageURL'        : "https:{{product.featured_image.src|img_url:'grande'}}", 
                        'productURL'      : '{{shop.secure_url}}{{product.url}}',
                        'sku'             : {{product.selected_variant.sku | json}},
                    },
                    {% endfor %}]
                };  
            dataLayer.push({
                'productList' : {{collection.title | json}},
                'pageType'    : 'Collection',
                'event'       : 'view_item_list',
                ecommerce
            });
        {% endif %}
            
        /** DATALAYER: Product Page
        * Fire on all Product View pages. */
        {% if template contains 'product' %}  
            var ecommerce = {
                'items': [{
                    'item_id'        : {{product.id | json}},  
                    'item_variant'    : {{product.selected_variant.title | json}},             
                    'item_name'      : {{product.title | json}},
                    'price'           : {{product.price | money_without_currency | replace: ',', '.' | json}},
                    'item_brand'      : {{product.vendor | json}},
                    'item_category'   : {{product.type | json}},
                    'item_list_name'  : {{collection.title | json}},
                    'description'     : {{product.description | strip_newlines | strip_html | json}},
                    'imageURL'        : 'https:{{product.featured_image.src|img_url:'grande'}}', 
                    'productURL'      : '{{product.url}}'
                }]
            };               
            dataLayer.push({
                'pageType' : 'Product',
                'event'    : 'view_item',
            	 ecommerce
            	});

            $(__DL__.cartTriggers).click(function(){
				dataLayer.push({                    
                    'event'    : 'add_to_cart',
                    ecommerce
               	});                  
            });              
  		{% endif %}
      
        /** DATALAYER: Cart View
        * Fire anytime a user views their cart (non-dynamic) */               
        {% if template contains 'cart' %}
            var ecommerce = {
                'currency': {{cart.currency.iso_code | json}},
                'value': {{cart.total_price | divided_by: 100.0 | json}},
                'items':[{% for line_item in cart.items %}{
                    'item_id'        : {{line_item.product.id | json}},                  
                    'item_variant'    : {{line_item.variant.title | json}},             
                    'item_name'      : {{line_item.product.title | json}},
                    'price'           : {{line_item.product.price | money_without_currency | replace: ',', '.' | json}},
                    'item_brand'      : {{line_item.product.vendor | json}},
                    'item_category'   : {{line_item.product.type | json}},
                    'item_list_name'  : {{line_item.collection.title | json}},
                    'quantity'        : {{line_item.quantity | json}},
                    'discount'		  : {{discount.code | json}}
                },{% endfor %}],
            };
            dataLayer.push({
                'pageType' : 'Cart',
                'event'    : 'view_cart',
                ecommerce
            });
        {% endif %}
                
        /** DATALAYER: Checkout on Shopify Plus **/
        if(Shopify.Checkout){
            var ecommerce = {
                'transaction_id': '{{checkout.order_number  | json}}',
                'affiliation': {{shop.name | json}},
                'value': {{checkout.total_price | money_without_currency | replace: ',', '.' | json}},
                'tax': {{checkout.tax_price | money_without_currency | replace: ',','.' | json}},
                'shipping': {{checkout.shipping_price | money_without_currency | replace: ',','.' | json}},
                'subtotal': {{checkout.subtotal_price | money_without_currency| replace: ',','.' | json}},
                'currency': {{checkout.currency | json}},
                {% for discount in checkout.discounts %}
                'coupon': {{discount.code | json}},
                'discount'  : {{discount.amount | money_without_currency | json}},
                {% endfor %}
                'email': {{checkout.email | json}},
                'items':[{% for line_item in checkout.line_items %}{
                    'item_id'        : {{line_item.product.id | json}},                  
                    'item_variant'    : {{line_item.variant.title | json}},             
                    'item_name'      : {{line_item.product.title | json}},
                    'price'           : {{line_item.product.price | money_without_currency | replace: ',', '.' | json}},
                    'item_brand'      : {{line_item.product.vendor | json}},
                    'item_category'   : {{line_item.product.type | json}},
                    'item_list_name'  : {{line_item.collection.title | json}},
                    'quantity'        : {{line_item.quantity | json}},
                    'discount'		  : {{discount.code | json}}
                    },{% endfor %}],
                };
            if(Shopify.Checkout.step){ 
                if(Shopify.Checkout.step.length > 0){
                    if (Shopify.Checkout.step === 'contact_information'){
                        dataLayer.push({
                            'event'    :'begin_checkout',
                            'pageType' :'Customer Information',
                            'step': 1,
                        	ecommerce
                        });
                    }else if (Shopify.Checkout.step === 'shipping_method'){
                        dataLayer.push({
                            'event'    :'add_shipping_info',
                            'pageType' :'Shipping Information',
                            ecommerce
                        });
                    }else if( Shopify.Checkout.step === "payment_method" ){
                        dataLayer.push({
                            'event'    :'add_payment_info',
                            'pageType' :'Add Payment Info',
                        	ecommerce
                        });
                    }
                }
                            
                /** DATALAYER: Transaction */
                if(Shopify.Checkout.page == "thank_you"){
                    dataLayer.push({
                    'pageType' :'Transaction',
                    'event'    :'purchase',
                    ecommerce
                    });
                }               
            }
        }
              
	    /** DOM Ready **/	
        $(document).ready(function() {

            /** DATALAYER: Search Results */
            var searchPage = new RegExp(__DL__.searchPage, "g");
            if(document.location.pathname.match(searchPage)){
                var ecommerce = {
                    items :[{% for product in search.results %}{
                        'item_id'        : {{product.id | json}},                  
                        'item_variant'    : {{product.variant.title | json}},             
                        'item_name'      : {{product.title | json}},
                        'price'           : {{product.price | money_without_currency | replace: ',', '.' | json}},
                        'item_brand'      : {{product.vendor | json}},
                        'item_category'   : {{product.type | json}},
                        'item_list_name'  : {{product.collection.title | json}},
                    },{% endfor %}],
                };
                dataLayer.push({
                    'pageType'   : "Search",
                    'search_term' : __DL__.searchTermQuery,                                       
                    'event'      : "search",
                    'item_list_name'  : {{line_item.collection.title | json}},
                    ecommerce
                });    
            }
            
            /** DATALAYER: Remove From Cart **/
            {% if template contains 'cart' %}
                var ecommerce = {
                    'items':[{% for line_item in cart.items %}{
                        'item_id'        : {{line_item.product.id | json}},                  
                        'item_variant'    : {{line_item.variant.title | json}},             
                        'item_name'      : {{line_item.product.title | json}},
                        'price'           : {{line_item.product.price | money_without_currency | replace: ',', '.' | json}},
                        'item_brand'      : {{line_item.product.vendor | json}},
                        'item_category'   : {{line_item.product.type | json}},
                        'item_list_name'  : {{line_item.collection.title | json}},
                        'quantity'        : {{line_item.quantity | json}},
                        'discount'		  : {{discount.code | json}}
                    },{% endfor %}],
                };
                
                $(__DL__.removeCartTrigger).click(function(){
                    dataLayer.push({
                        'pageType'   : "Remove from cart",
                        'event' : 'remove_from_cart',
                        ecommerce
                    });                                 
                });               
            {% endif %}

            /** Google Tag Manager **/
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');

        }); // document ready
    }
}, 500);
  
</script>              
