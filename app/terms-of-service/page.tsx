import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Terms of Service</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              Please read these Terms of Service ("Terms") carefully before using the TimeTrack AI website and service.
            </p>

            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of
              the terms, you may not access the service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              TimeTrack AI provides an AI-powered time tracking service that allows users to track time spent on various
              projects and tasks. The service includes features such as time entry, reporting, and project management.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              To use certain features of the service, you must register for an account. You agree to provide accurate,
              current, and complete information during the registration process and to update such information to keep
              it accurate, current, and complete.
            </p>

            <h2>4. Subscription and Payments</h2>
            <p>
              Some aspects of the service may be provided on a subscription basis. Payment terms will be specified
              during the purchase process. You agree to pay all charges at the prices then in effect for your
              subscription.
            </p>

            <h2>5. Intellectual Property Rights</h2>
            <p>
              The service and its original content, features, and functionality are and will remain the exclusive
              property of TimeTrack AI and its licensors. The service is protected by copyright, trademark, and other
              laws.
            </p>

            <h2>6. User Content</h2>
            <p>
              You retain all rights to any content you submit, post, or display on or through the service. By submitting
              content to the service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce,
              modify, adapt, publish, translate, and distribute your content in any existing or future media.
            </p>

            <h2>7. Prohibited Uses</h2>
            <p>You agree not to use the service:</p>
            <ul>
              <li>In any way that violates any applicable law or regulation</li>
              <li>To transmit any material that is defamatory, obscene, or offensive</li>
              <li>To impersonate or attempt to impersonate the company, an employee, or another user</li>
              <li>To engage in any conduct that restricts or inhibits anyone's use of the service</li>
              <li>To attempt to gain unauthorized access to the service or related systems</li>
            </ul>

            <h2>8. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the service immediately, without prior notice or
              liability, for any reason, including breach of these Terms.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              In no event shall TimeTrack AI, its directors, employees, partners, agents, suppliers, or affiliates be
              liable for any indirect, incidental, special, consequential, or punitive damages, including loss of
              profits, data, or other intangible losses.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
              provide at least 30 days' notice prior to any new terms taking effect.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United Kingdom, without
              regard to its conflict of law provisions.
            </p>

            <h2>12. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>
              Email: legal@timetrackAI.com
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
