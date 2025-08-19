import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container px-4 md:px-6 py-12">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Settings</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your account settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Settings Menu</CardTitle>
                  <CardDescription>Navigate to different settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <nav className="flex flex-col space-y-2">
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="/settings">Account</Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="/settings/notifications">Notifications</Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="/settings/billing">Billing</Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="/settings/integrations">Integrations</Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link href="/settings/team">Team</Link>
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Profile Information</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Update your account profile information</p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium" htmlFor="name">
                          Name
                        </label>
                        <input id="name" className="w-full p-2 border rounded-md" placeholder="Your name" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium" htmlFor="email">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full p-2 border rounded-md"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                  </div>

                  <div className="pt-6 border-t space-y-2">
                    <h3 className="text-lg font-medium">Password</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Update your password</p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium" htmlFor="current-password">
                          Current Password
                        </label>
                        <input
                          id="current-password"
                          type="password"
                          className="w-full p-2 border rounded-md"
                          placeholder="Current password"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium" htmlFor="new-password">
                          New Password
                        </label>
                        <input
                          id="new-password"
                          type="password"
                          className="w-full p-2 border rounded-md"
                          placeholder="New password"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium" htmlFor="confirm-password">
                          Confirm New Password
                        </label>
                        <input
                          id="confirm-password"
                          type="password"
                          className="w-full p-2 border rounded-md"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Update Password</Button>
                  </div>

                  <div className="pt-6 border-t space-y-2">
                    <h3 className="text-lg font-medium">Legal</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Review our legal documents</p>
                    <div className="space-y-2">
                      <Link href="/privacy-policy" className="text-blue-600 hover:underline block">
                        Privacy Policy
                      </Link>
                      <Link href="/terms-of-service" className="text-blue-600 hover:underline block">
                        Terms of Service
                      </Link>
                      <Link href="/cookie-policy" className="text-blue-600 hover:underline block">
                        Cookie Policy
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
