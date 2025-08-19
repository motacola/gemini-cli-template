import Link from "next/link"

export default function CookiePolicyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container px-4 md:px-6 py-12 max-w-3xl mx-auto">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Cookie Policy</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              This Cookie Policy explains how TimeTrack AI uses cookies and similar technologies to recognize you when
              you visit our website. It explains what these technologies are and why we use them, as well as your rights
              to control our use of them.
            </p>

            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website.
              Cookies are widely used by website owners to make their websites work, or to work more efficiently, as
              well as to provide reporting information.
            </p>

            <h2>Why Do We Use Cookies?</h2>
            <p>We use cookies for several reasons:</p>
            <ul>
              <li>Essential cookies: These are necessary for the website to function properly</li>
              <li>Functionality cookies: These recognize you when you return to our website</li>
              <li>Analytical cookies: These help us understand how visitors interact with our website</li>
              <li>Advertising cookies: These are used to deliver advertisements relevant to you</li>
              <li>Social media cookies: These enable social sharing functionality</li>
            </ul>

            <h2>Types of Cookies We Use</h2>
            <p>The specific types of cookies served through our website and the purposes they perform include:</p>

            <h3>Essential Website Cookies</h3>
            <p>
              These cookies are strictly necessary to provide you with services available through our website and to use
              some of its features, such as access to secure areas.
            </p>

            <h3>Performance and Functionality Cookies</h3>
            <p>
              These cookies are used to enhance the performance and functionality of our website but are non-essential
              to their use. However, without these cookies, certain functionality may become unavailable.
            </p>

            <h3>Analytics and Customization Cookies</h3>
            <p>
              These cookies collect information that is used either in aggregate form to help us understand how our
              website is being used or how effective our marketing campaigns are, or to help us customize our website
              for you.
            </p>

            <h3>Advertising Cookies</h3>
            <p>
              These cookies are used to make advertising messages more relevant to you. They perform functions like
              preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in
              some cases selecting advertisements that are based on your interests.
            </p>

            <h2>How Can You Control Cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences
              by clicking on the appropriate opt-out links provided in the cookie banner on our website.
            </p>
            <p>
              You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject
              cookies, you may still use our website though your access to some functionality and areas of our website
              may be restricted.
            </p>

            <h2>Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the
              cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this
              Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>

            <h2>Contact Us</h2>
            <p>If you have any questions about our use of cookies or other technologies, please contact us at:</p>
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
