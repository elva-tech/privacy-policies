export const privacyPolicies = {
  enandi: {
    companyName: "Enandi",
    website: "https://enandi.elvatech.in",
    supportEmail: "support@enandi.com",
      logo: "/logos/Enandi.png",

    sections: [
      {
        title: "Introduction",
        content:
          "Enandi is a flexible commerce platform that enables businesses, vendors, and partners to create and manage their own digital storefronts and commerce operations.",
      },

      {
        title: "Information We Collect",
        content:
          "We may collect user information including account details, contact information, order details, delivery information, usage analytics, and device-related information required to provide platform services.",
      },

      {
        title: "How We Use Information",
        content:
          "Collected information is used to operate the platform, process orders, improve services, provide customer support, manage vendor operations, and enhance user experience.",
      },

      {
        title: "Business & Vendor Responsibility",
        content:
          "Businesses and vendors using Enandi are responsible for managing their own storefronts, products, customer interactions, and compliance with applicable laws and regulations.",
      },

      {
        title: "Payments",
        content:
          "Payments may be processed through third-party payment providers. Enandi does not directly store sensitive payment card information.",
      },

      {
        title: "Location Services",
        content:
          "Location-related data may be used to support delivery services, regional operations, and customer experience improvements.",
      },

      {
        title: "Data Security",
        content:
          "We implement reasonable security measures to protect user information and platform operations against unauthorized access or misuse.",
      },

      {
        title: "Third-Party Services",
        content:
          "The platform may integrate with third-party services including payment gateways, analytics providers, logistics systems, and communication tools.",
      },

      {
        title: "Policy Updates",
        content:
          "This Privacy Policy may be updated periodically to reflect platform improvements, legal requirements, or operational changes.",
      },

      {
        title: "Contact Us",
        content:
          "For privacy-related questions or concerns, please contact the respective business or platform support team.",
      },
    ],
  },

  puma: {
    companyName: "PUMA",
    website: "https://puma.com",
    supportEmail: "privacy@puma.com",
    logo: "/logos/Puma.png",

    sections: [
      {
        title: "Introduction",
        content:
          "PUMA respects your privacy. This policy explains how we collect, use, disclose, and safeguard information when you use our websites, apps, retail channels, and related services in regions where this notice applies.",
      },
      {
        title: "Information We Collect",
        content:
          "We may collect identifiers (such as name and email), account and order details, payment-related information processed by partners, device and usage data, location where permitted, marketing preferences, and content you submit through customer care or promotions.",
      },
      {
        title: "How We Use Information",
        content:
          "We use information to fulfill orders, operate digital platforms, personalize experiences, communicate about products and offers where allowed, improve products and services, secure our systems, and comply with legal obligations.",
      },
      {
        title: "Retail & Partners",
        content:
          "Some stores and experiences may be operated with franchisees or retail partners. Those parties may process information under their own notices where applicable; we encourage you to review notices presented at the point of collection.",
      },
      {
        title: "Payments",
        content:
          "Payment transactions may be handled by payment service providers. PUMA generally does not store full payment card numbers on its own systems; providers process card data according to their terms and security practices.",
      },
      {
        title: "Marketing & Cookies",
        content:
          "Where permitted, we may send marketing messages and use cookies or similar technologies for analytics, personalization, and advertising. You can manage cookie preferences where offered and unsubscribe from marketing emails via provided links.",
      },
      {
        title: "Data Security",
        content:
          "We implement administrative, technical, and organizational measures designed to protect personal information. No method of transmission or storage is completely secure; we continually work to improve safeguards.",
      },
      {
        title: "International Transfers",
        content:
          "PUMA operates globally. Personal information may be processed in countries other than your own, including where we or our vendors maintain facilities, subject to applicable safeguards and legal requirements.",
      },
      {
        title: "Your Rights",
        content:
          "Depending on your location, you may have rights to access, correct, delete, restrict, or object to certain processing, and to lodge a complaint with a supervisory authority. Use the contact details below to submit requests where available.",
      },
      {
        title: "Children",
        content:
          "Our services are not directed to children under the minimum age defined by applicable law. We do not knowingly collect personal information from children inappropriately.",
      },
      {
        title: "Policy Updates",
        content:
          "We may update this Privacy Policy to reflect operational, legal, or regulatory changes. We will post the revised policy with an updated effective date where required.",
      },
      {
        title: "Contact Us",
        content:
          "For privacy-related requests or questions, please contact us using the customer support email shown on this page or through official PUMA support channels listed on our website for your region.",
      },
    ],
  },
};

export function listPrivacyPolicies() {
  return Object.entries(privacyPolicies).map(([slug, policy]) => ({
    slug,
    companyName: policy.companyName,
    logo: policy.logo,
    website: policy.website,
  }));
}