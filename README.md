# Shopify E-Commerce dataLayer for GA4 and GTM

### References

- [Data Layer](https://developers.google.com/tag-platform/devguides/datalayer?hl=en)
- [Shopify Liquid Variables Cheat Sheet](https://www.shopify.com/partners/shopify-cheat-sheet) 
- [GA4 Events](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 Objects schema](https://support.google.com/analytics/answer/10119380?hl=en)
- [Simo Ahava E-Commerce Guide for GA4](https://www.simoahava.com/analytics/google-analytics-4-ecommerce-guide-google-tag-manager/)

### GTM Pages & Variables Import
You can import the `GTM-InitialSetup.json` container that sets up most of the GTM Triggers and Variables for you.

### Tag Manager
Add your Google Tag Manager ID ([GTM-XXX)](https://developers.google.com/tag-platform/tag-manager/web?hl=en) at the end of the [dataLayer-allPages.js](https://github.com/ruturajjadeja21/GA4-Shopify-DataLayer/blob/master/dataLayer-allPages.js) file.
If you are going to copy the GTM code from your account remember to **remove** the `<script>` tags.
Within this repository you will also find a Tag Manager container that has and event that fires on these e-commerce events:
`view_item_list|view_item|add_to_cart|view_cart|begin_checkout|shipping_method|payment_method|purchase|search|remove_from_cart`.

Additional events are:

 - `first_time_visitor` fired if a user lands on your website for the
   first time
  - `blog` fired on every blog page also pushes post author,
   post's creation date and title
 - `logState` fired on each page, pushed
   website general info and customer info (**do not** [import sensitive
   data](https://support.google.com/analytics/answer/6366371?hl=en#zippy=,in-this-article) into Analytics), 
 - `homepage` fired on your website's homepage
 - `404` fired if a not found file/page is visited, pushes the URL path

### Installation:

| Assets | Integration Type | Asset Type |
| --------|---------|---------|
|*theme.liquid* (or your primary theme template) | Modification |**Layout:**  _Online Store > Themes > ... > Edit HTML/CSS > Layout > theme.liquid (or primary theme template)_|
|checkout.liquid | Modification |**Layout:**  _Online Store > Themes > ... > Edit HTML/CSS > Layout > checkout.liquid_|
|dataLayer-allPages|Creation|**Snippet:**  _Online Store > Themes > ... > Edit HTML/CSS > Snippets > (will create Snippet in instructions)_|
|Google Tag Manager|Modification|**Layout:**  _Online Store > Themes > Snippets > dataLayer-allPages.liquid_. Add your GTM-XXXX ID at the end.

**Create the dataLayer-allPages snippet (  _use exact naming and casing!_  )**

-   Create a snippet called  **_dataLayer-allPages_**  and copy over the provided  [dataLayer-allPages.js](https://github.com/ruturajjadeja21/GA4-Shopify-DataLayer/blob/main/dataLayer-allPages.js) file in the newly created snippet. 
- In the code, navigate to the `Dynamic Dependencies` section and make any necessary changes.

**Add the code to the layouts**

-   Within the  **theme.liquid**  layout, place this include snippet  `{% include 'dataLayer-allPages' %}`  right before the closing </head> tag
-   Within the  **checkout.liquid**  layout, place this include snippet  `{% include 'dataLayer-allPages' %}`  right before the closing </head> tag
