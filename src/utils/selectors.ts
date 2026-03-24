/**
 * Centralized selector constants for all UI elements
 * Provides single source of truth for data-test selectors and class selectors
 */
export const SELECTORS = {
  // Header & Navigation
  HEADER_CONTAINER: '[data-test="header-container"]',
  OPEN_MENU: '#react-burger-menu-btn',
  CLOSE_MENU: '[data-test="close-menu"]',
  MENU_OVERLAY: '.bm-menu-wrap',
  SHOPPING_CART_LINK: '[data-test="shopping-cart-link"]',
  SHOPPING_CART_BADGE: '.shopping_cart_badge',
  PRODUCT_SORT_CONTAINER: '[data-test="product-sort-container"]',

  // Menu Items
  INVENTORY_SIDEBAR_LINK: '[data-test="inventory-sidebar-link"]',
  ABOUT_SIDEBAR_LINK: '[data-test="about-sidebar-link"]',
  LOGOUT_SIDEBAR_LINK: '[data-test="logout-sidebar-link"]',
  RESET_SIDEBAR_LINK: '[data-test="reset-sidebar-link"]',

  // Login Page
  USERNAME_INPUT: '[data-test="username"]',
  PASSWORD_INPUT: '[data-test="password"]',
  LOGIN_BUTTON: '[data-test="login-button"]',
  ERROR_MESSAGE: '[data-test="error"]',

  // Products Page
  PAGE_TITLE: '[data-test="title"]',
  INVENTORY_CONTAINER: '[data-test="inventory-container"]',
  INVENTORY_LIST: '[data-test="inventory-list"]',
  INVENTORY_ITEM: '[data-test="inventory-item"]',
  INVENTORY_ITEM_NAME: '[data-test="inventory-item-name"]',
  INVENTORY_ITEM_DESC: '[data-test="inventory-item-desc"]',
  INVENTORY_ITEM_PRICE: '[data-test="inventory-item-price"]',
  INVENTORY_ITEM_IMAGE: '.inventory_item_img',
  INVENTORY_ITEM_IMAGE_LINK: '.inventory_item_img a',
  ADD_TO_CART_BUTTON: 'button[data-test*="add-to-cart"]',

  // Cart Page
  CART_CONTENTS_CONTAINER: '[data-test="cart-contents-container"]',
  CART_QUANTITY_LABEL: '[data-test="cart-quantity-label"]',
  CART_DESC_LABEL: '[data-test="cart-desc-label"]',
  CONTINUE_SHOPPING: '[data-test="continue-shopping"]',
  CHECKOUT_BUTTON: '[data-test="checkout"]',
  REMOVE_BUTTON: 'button[data-test*="remove"]',
  CART_ITEM_QUANTITY: '.cart_item_quantity',

  // Checkout Info Page
  CHECKOUT_INFO_CONTAINER: '[data-test="checkout-info-container"]',
  FIRST_NAME_INPUT: '[data-test="firstName"]',
  LAST_NAME_INPUT: '[data-test="lastName"]',
  POSTAL_CODE_INPUT: '[data-test="postalCode"]',
  CONTINUE_BUTTON: '[data-test="continue"]',
  CANCEL_BUTTON: '[data-test="cancel"]',
  ERROR_MESSAGE_CONTAINER: '.error-message-container',
  CART_FOOTER: '.cart_footer',

  // Checkout Complete Page
  CHECKOUT_COMPLETE_CONTAINER: '[data-test="checkout-complete-container"]',
  COMPLETE_HEADER: '[data-test="complete-header"]',
  COMPLETE_TEXT: '[data-test="complete-text"]',
  PONY_EXPRESS_IMAGE: '[data-test="pony-express"]',
  BACK_TO_PRODUCTS: '[data-test="back-to-products"]',
  FINISH_BUTTON: '[data-test="finish"]',
} as const;
