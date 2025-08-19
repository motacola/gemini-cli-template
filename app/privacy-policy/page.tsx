import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Privacy Policy</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              At TimeTrack AI, we take your privacy seriously. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our website or use our time tracking service.
            </p>

            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us when you:</p>
            <ul>
              <li>Register for an account</li>
              <li>Use our time tracking features</li>
              <li>Contact our support team</li>
              <li>Subscribe to our newsletter</li>
              <li>Respond to surveys or fill out forms</li>
            </ul>

            <p>The types of information we may collect include:</p>
            <ul>
              <li>Personal identifiers (name, email address, phone number)</li>
              <li>Account credentials</li>
              <li>Billing information</li>
              <li>Time tracking data</li>
              <li>Project and client information</li>
              <li>Device and usage information</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative messages and updates</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Provide customer support</li>
              <li>Send marketing communications</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Protect against harmful or illegal activity</li>
            </ul>

            <h2>Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this
              Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal
              information. However, please be aware that no method of transmission over the Internet or electronic
              storage is 100% secure.
            </p>

            <h2>Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to rectify inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>
              Email: privacy@timetrackAI.com
              <br />
              Address: 123 Time Street, London, UK
            </p>
          </div>

          <div className="pt-8 border-t">
            <Link href="/" className="text-blue-600 hover:underline">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
