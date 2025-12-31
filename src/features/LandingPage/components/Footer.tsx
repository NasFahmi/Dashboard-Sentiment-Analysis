import { assets } from "@/assets/assets";
import { Instagram, Twitter, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-[120px] border-t border-slate-200 px-6">
      <div className="mx-auto max-w-7xl py-16">
        {/* Top */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src={assets.Logo} alt="Sentinela" className="w-8 h-8" />
              <span className="text-lg font-semibold text-slate-900">
                Sentinela
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              AI-powered social media sentiment analytics platform to help you
              understand public opinion and make data-driven decisions.
            </p>

            <div className="text-sm text-slate-600 space-y-2">
              <p>
                <span className="font-medium">Contact:</span>{" "}
                support@sentinela.my.id
              </p>
              <p>
                <span className="font-medium">Office:</span> Indonesia
              </p>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900">Product</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="hover:text-blue-600 cursor-pointer">
                Features
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Sentiment Analysis
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                ABSA
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Content Recommendation
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Data Scraper
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="hover:text-blue-600 cursor-pointer">
                Documentation
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                API Reference
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Help Center
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                FAQs
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-900">Company</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="hover:text-blue-600 cursor-pointer">
                About Us
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Research
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Terms of Service
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">
            © 2025 Sentinela. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-slate-500">
            <button className="hover:text-blue-600 transition">
              <Instagram size={18} />
            </button>
            <button className="hover:text-blue-600 transition">
              <Twitter size={18} />
            </button>
            <button className="hover:text-blue-600 transition">
              <Globe size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
