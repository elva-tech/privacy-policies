export const privacyPolicies = {
enandi: {
  companyName: "Enandi",
  website: "https://enandi.elvatech.in",
  supportEmail: "support@enandi.com",
  logo: "/logos/Enandi.png",

  sections: [
    {
      title: "Overview",
      content:
        "Enandi is a digital commerce infrastructure platform that enables businesses, vendors, and partners to create, manage, and operate online storefronts, commerce workflows, and customer experiences. This Privacy Policy explains how information may be collected, used, processed, disclosed, and protected when users access or interact with services powered by Enandi.",
    },

    {
      title: "Information We Collect",
      content:
        "We may collect information including your name, phone number, email address, delivery address, account credentials, order details, payment references, communication history, device information, IP address, browser information, usage activity, and location-related information where permitted by applicable law.",
    },

    {
      title: "How We Use Information",
      content:
        "Collected information may be used to operate platform services, process transactions, manage deliveries, improve platform functionality, personalize experiences, provide customer support, communicate service updates, detect fraudulent activity, maintain platform security, analyze performance, and comply with legal or regulatory obligations.",
    },

    {
      title: "Orders, Deliveries & Transactions",
      content:
        "When you place orders through businesses powered by Enandi, relevant information including order details, delivery instructions, transaction references, and contact information may be shared with merchants, vendors, logistics providers, and operational partners involved in fulfilling services or transactions.",
    },

    {
      title: "Payments",
      content:
        "Payments made using the platform may be processed through secure third-party payment service providers. Enandi does not directly store complete debit card, credit card, UPI PIN, CVV, or banking credentials on its own systems.",
    },

    {
      title: "Location Information",
      content:
        "Location-related information may be collected to support delivery operations, regional service availability, nearby store discovery, operational analytics, fraud prevention, delivery optimization, and customer experience improvements.",
    },

    {
      title: "Cookies & Analytics",
      content:
        "We may use cookies, analytics services, pixels, and similar technologies to remember preferences, analyze traffic, improve platform functionality, measure engagement, enhance performance, and provide a smoother user experience across supported devices and platforms.",
    },

    {
      title: "Third-Party Services",
      content:
        "Enandi may integrate with third-party services including payment gateways, analytics providers, cloud infrastructure services, customer communication tools, logistics systems, authentication services, and operational software providers. Such third parties may process information according to their own policies and applicable legal requirements.",
    },

    {
      title: "Business & Vendor Responsibility",
      content:
        "Businesses, vendors, and partners operating through Enandi are independently responsible for managing their products, storefront operations, customer interactions, legal compliance obligations, and fulfillment processes associated with their services and commerce activities.",
    },

    {
      title: "Data Security",
      content:
        "We implement reasonable administrative, operational, and technical safeguards intended to protect information against unauthorized access, misuse, alteration, disclosure, or destruction. However, no digital platform, transmission method, or storage system can be guaranteed to be completely secure.",
    },

    {
      title: "Your Choices & Rights",
      content:
        "Users may update account information, manage permissions, disable location access, opt out of certain communications where applicable, or discontinue usage of services subject to operational, contractual, or legal requirements.",
    },

    {
      title: "Policy Updates",
      content:
        "This Privacy Policy may be updated periodically to reflect operational improvements, feature changes, legal requirements, regulatory obligations, or modifications to platform services. Updated versions will be published through official platform channels.",
    },

    {
      title: "Contact Us",
      content:
        "For questions, requests, concerns, or privacy-related matters regarding services powered by Enandi, users may contact the support team using the contact information provided on this page.",
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
      title: "Overview",
      content:
        "PUMA values user privacy and is committed to protecting personal information collected through its digital platforms, retail experiences, applications, and related services. This Privacy Policy explains how information may be collected, used, disclosed, processed, and safeguarded when users interact with services operated or supported by PUMA.",
    },

    {
      title: "Information We Collect",
      content:
        "We may collect personal information including name, email address, phone number, billing address, delivery address, account information, purchase history, payment references, device information, browser activity, IP address, location data where permitted, communication history, and interactions across digital platforms.",
    },

    {
      title: "How We Use Information",
      content:
        "Information may be used to process orders, manage customer accounts, provide customer support, improve services, personalize experiences, communicate updates and promotional content where permitted, maintain security, prevent fraud, analyze performance, and comply with applicable laws and operational obligations.",
    },

    {
      title: "Orders & Retail Operations",
      content:
        "Information related to purchases, deliveries, returns, exchanges, customer support requests, and retail experiences may be processed through internal teams, authorized retail partners, logistics providers, and operational vendors involved in service fulfillment.",
    },

    {
      title: "Payments",
      content:
        "Payment transactions may be securely processed through third-party payment providers. PUMA generally does not directly store complete payment card details, banking credentials, or sensitive payment authentication information on its own infrastructure.",
    },

    {
      title: "Marketing & Cookies",
      content:
        "PUMA may use cookies, pixels, analytics technologies, and similar tracking mechanisms to improve website performance, understand user interactions, personalize experiences, measure marketing effectiveness, and provide relevant communications where legally permitted.",
    },

    {
      title: "International Data Transfers",
      content:
        "As a global brand, PUMA may process or transfer information across different countries and regions where affiliated entities, infrastructure providers, or operational partners maintain facilities, subject to applicable safeguards and legal requirements.",
    },

    {
      title: "Third-Party Services",
      content:
        "PUMA may work with third-party service providers including logistics partners, payment processors, cloud hosting providers, analytics vendors, customer communication platforms, and retail partners to support platform operations and service delivery.",
    },

    {
      title: "Data Security",
      content:
        "Reasonable administrative, technical, and organizational measures are implemented to help protect information against unauthorized access, misuse, alteration, or disclosure. Despite these efforts, no platform or transmission system can guarantee complete security.",
    },

    {
      title: "Your Rights & Choices",
      content:
        "Depending on applicable laws and regional regulations, users may have rights related to accessing, correcting, deleting, restricting, or objecting to certain processing activities associated with their personal information.",
    },

    {
      title: "Children's Privacy",
      content:
        "PUMA services are not intended for children below the minimum age permitted under applicable laws. We do not knowingly collect personal information from children in violation of legal requirements.",
    },

    {
      title: "Policy Updates",
      content:
        "This Privacy Policy may be revised periodically to reflect changes in services, legal obligations, operational practices, or regulatory requirements. Updated versions will be published through official channels with revised effective dates where required.",
    },

    {
      title: "Contact Us",
      content:
        "For privacy-related questions, requests, or concerns regarding PUMA services, users may contact the appropriate support or privacy team using the contact information available on official PUMA platforms.",
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