import Link from "next/link";
import { AlertTriangle, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Live Alerts", href: "/alerts" },
    { name: "Survival Guides", href: "/guides" },
    { name: "Mobile App", href: "/app" },
    { name: "For Government", href: "/admin" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API Access", href: "/api-docs" },
    { name: "Data Sources", href: "/data" },
    { name: "Research", href: "/research" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Partners", href: "/partners" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Earth<span className="text-primary-400">-</span>Quake
              </span>
            </Link>
            <p className="text-neutral-400 text-sm mb-4 max-w-xs">
              Predict early. Alert everyone. Save lives. Building a safer future through
              real-time disaster intelligence.
            </p>
            <div className="space-y-2">
              <a
                href="tel:112"
                className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                Emergency: 112
              </a>
              <a
                href="mailto:help@earthquake.in"
                className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                help@earthquake.in
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} Earth-Quake. Built for emergencies.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-neutral-600">
                Disaster Intelligence Platform
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
