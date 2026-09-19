export interface HelpTopic {
  slug: string;
  name: string;
  summary: string;
  /** Topics that need a live service (chat, order lookup) are flagged coming soon. */
  comingSoon?: boolean;
  faqs: { q: string; a: string }[];
}

export const HELP_TOPICS: HelpTopic[] = [
  {
    slug: "my-account",
    name: "MY ACCOUNT",
    summary: "Registration, log in and personal details.",
    comingSoon: true,
    faqs: [],
  },
  {
    slug: "items-and-sizes",
    name: "ITEMS AND SIZES",
    summary: "Sizing, composition and item availability.",
    faqs: [
      {
        q: "How do I find my size?",
        a: "Each product page includes a size guide with measurements in centimetres and inches. Compare them with a garment you already own that fits well. If you are between two sizes, we recommend choosing the larger one for relaxed fits and the smaller one for tailored fits.",
      },
      {
        q: "What does the composition of a garment mean?",
        a: "The composition lists the fibres used in each part of the item (outer shell, lining, filling). It is shown in the COMPOSITION, CARE & ORIGIN section of every product page together with washing instructions.",
      },
      {
        q: "An item is out of stock. Will it be restocked?",
        a: "Collections are renewed continuously and restocks are not guaranteed. Add the product to your wishlist to keep track of it and check back regularly.",
      },
      {
        q: "Where can I see the care instructions?",
        a: "Care symbols and written instructions are printed on the inner label of every garment and repeated on the product page under COMPOSITION, CARE & ORIGIN.",
      },
    ],
  },
  {
    slug: "gift-card",
    name: "GIFT CARD",
    summary: "Buying, activating and redeeming gift cards.",
    faqs: [
      {
        q: "How can I buy a gift card?",
        a: "Physical and virtual gift cards can be purchased in store and online. Virtual gift cards are delivered by e-mail to the recipient on the date you choose.",
      },
      {
        q: "How do I check the balance of my gift card?",
        a: "Enter the card number and PIN on the gift card page to see the remaining balance and the expiry date.",
      },
      {
        q: "Can I use a gift card with other payment methods?",
        a: "Yes. If the order total is higher than the gift card balance you can pay the difference with any other accepted payment method.",
      },
    ],
  },
  {
    slug: "shipping",
    name: "SHIPPING",
    summary: "Delivery methods, times and costs.",
    faqs: [
      {
        q: "What delivery methods are available?",
        a: "Standard home delivery (2–5 working days), express home delivery (1–2 working days), delivery to a store and delivery to a collection point. Available options are shown at checkout depending on your address.",
      },
      {
        q: "How much does shipping cost?",
        a: "Standard delivery is free on orders over $50. Below that amount a flat fee is applied. Express delivery has a fixed cost that is shown before you confirm your order.",
      },
      {
        q: "Can I change the delivery address after placing an order?",
        a: "The delivery address can be modified from your order details as long as the order has not been prepared for shipping.",
      },
      {
        q: "Do you ship internationally?",
        a: "Each online store ships within its own market. To order from another country, select the corresponding store from the country selector at the bottom of the page.",
      },
    ],
  },
  {
    slug: "payment-and-invoices",
    name: "PAYMENT AND INVOICES",
    summary: "Accepted payment methods and invoicing.",
    faqs: [
      {
        q: "Which payment methods are accepted?",
        a: "Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay and gift cards. All payments are processed through a secure encrypted connection.",
      },
      {
        q: "When will I be charged?",
        a: "The amount is authorised when you place the order and charged once the order is confirmed and prepared for shipping.",
      },
      {
        q: "How do I request an invoice?",
        a: "An electronic receipt is sent by e-mail with every order. Company invoices can be requested from the order details page within 30 days of purchase.",
      },
    ],
  },
  {
    slug: "my-purchases",
    name: "MY PURCHASES",
    summary: "Order status, tracking and modifications.",
    comingSoon: true,
    faqs: [],
  },
  {
    slug: "exchanges-returns-and-refunds",
    name: "EXCHANGES, RETURNS AND REFUNDS",
    summary: "How to return or exchange an item.",
    faqs: [
      {
        q: "How long do I have to return an item?",
        a: "You have 30 days from the shipping date to return items purchased online, provided they are in their original condition with all labels attached.",
      },
      {
        q: "How can I return an order?",
        a: "Returns can be made free of charge at any store in the same market, or by requesting a return from your order details and dropping the parcel at a collection point. A small fee may apply to home pick-up returns.",
      },
      {
        q: "When will I receive my refund?",
        a: "Once the items have been received and checked, the refund is issued to the original payment method within 14 days. Your bank may take a few additional days to display it.",
      },
      {
        q: "Can I exchange an item for a different size or colour?",
        a: "Exchanges for a different size or colour of the same item can be requested online within 30 days. The new item is shipped once the exchange is confirmed.",
      },
      {
        q: "Which items cannot be returned?",
        a: "For hygiene reasons, underwear, swimwear without the hygiene strip, earrings, perfumes that have been opened and personalised items cannot be returned.",
      },
    ],
  },
  {
    slug: "shops-and-company",
    name: "SHOPS AND COMPANY",
    summary: "Store information, opening hours and company details.",
    faqs: [
      {
        q: "How do I find my nearest store?",
        a: "Use the store locator to search by city or postcode. It shows opening hours, services available in each store and directions.",
      },
      {
        q: "Can I check whether an item is available in a store?",
        a: "Yes. Select CHECK IN-STORE AVAILABILITY on the product page to see stock by store for the selected size and colour.",
      },
      {
        q: "Where can I find information about the company?",
        a: "Visit the ABOUT US and JOIN LIFE pages linked in the footer for information about the company, its values and its sustainability commitments.",
      },
    ],
  },
  {
    slug: "technical-info",
    name: "TECHNICAL INFO",
    summary: "Browser support, cookies and privacy.",
    faqs: [
      {
        q: "Which browsers are supported?",
        a: "The latest two versions of Chrome, Safari, Firefox and Edge are fully supported. Older browsers may display the site with reduced functionality.",
      },
      {
        q: "How can I manage cookies?",
        a: "Select COOKIE SETTINGS in the footer at any time to accept, reject or review the cookies used on this site.",
      },
      {
        q: "Is my data secure?",
        a: "All data is transmitted over an encrypted connection and processed according to the privacy policy linked in the footer.",
      },
    ],
  },
  {
    slug: "contact",
    name: "CONTACT",
    summary: "Chat, e-mail and phone support.",
    comingSoon: true,
    faqs: [],
  },
];

export function getHelpTopic(slug: string): HelpTopic | undefined {
  return HELP_TOPICS.find((t) => t.slug === slug);
}
