export const cookiePolicy = {
  title: 'Cookie Policy',
  effectiveDate: '2025-01-25',

  sections: [
    {
      id: 'what-are-cookies',
      title: '1. What Are Cookies',
      content: `Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and understand how you use the site.`,
    },
    {
      id: 'types',
      title: '2. Types of Cookies We Use',
      content: `**2.1 Essential Cookies (Required)**
These cookies are necessary for the website to function:
• Authentication and login
• Security features
• Load balancing
• Shopping cart functionality

**2.2 Functional Cookies**
These remember your preferences:
• Language preferences
• Currency selection
• Theme settings (dark/light mode)

**2.3 Analytics Cookies**
These help us understand usage:
• Pages visited and time spent
• Click patterns
• Error tracking
• Performance monitoring

We use: Google Analytics, Mixpanel

**2.4 Marketing Cookies (Optional)**
These help deliver relevant advertisements:
• Ad targeting
• Campaign measurement
• Social media integration

We use: Facebook Pixel, Google Ads`,
    },
    {
      id: 'cookie-list',
      title: '3. Specific Cookies We Use',
      content: `| Cookie Name | Type | Purpose | Duration |
|-------------|------|---------|----------|
| carebow_session | Essential | User authentication | Session |
| carebow_csrf | Essential | Security token | Session |
| carebow_currency | Functional | Currency preference | 1 year |
| carebow_locale | Functional | Language preference | 1 year |
| _ga | Analytics | Google Analytics ID | 2 years |
| _gid | Analytics | Google Analytics ID | 24 hours |
| _fbp | Marketing | Facebook tracking | 3 months |`,
    },
    {
      id: 'managing',
      title: '4. Managing Cookies',
      content: `**4.1 Cookie Consent Banner**
When you first visit, you can:
• Accept all cookies
• Reject non-essential cookies
• Customize preferences

**4.2 Browser Settings**
Control cookies through your browser:
• Chrome: Settings → Privacy and Security → Cookies
• Safari: Preferences → Privacy
• Firefox: Options → Privacy & Security
• Edge: Settings → Privacy, search, and services

**4.3 Opt-Out Links**
• Google Analytics: tools.google.com/dlpage/gaoptout
• Facebook: facebook.com/settings?tab=ads

**4.4 Consequences of Disabling**
Disabling cookies may:
• Affect website functionality
• Require repeated login
• Reset your preferences`,
    },
    {
      id: 'mobile',
      title: '5. Mobile App Tracking',
      content: `Our mobile apps use similar technologies:
• Device identifiers
• Analytics SDKs
• Crash reporting tools

Control app tracking through device settings:
• iOS: Settings → Privacy → Tracking
• Android: Settings → Privacy → Ads`,
    },
    {
      id: 'contact',
      title: '6. Contact Us',
      content: `For questions about our use of cookies:
Email: privacy@carebow.com`,
    },
  ],
};
