import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function TeamActivity() {
  // This would typically come from your database
  const teamMembers = [
    {
      id: "1",
      name: "Alex Johnson",
      role: "Senior Designer",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
      hoursLogged: 32,
      target: 40,
      progress: 80,
    },
    {
      id: "2",
      name: "Sarah Miller",
      role: "Copywriter",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SM",
      hoursLogged: 38,
      target: 40,
      progress: 95,
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Art Director",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
      hoursLogged: 35,
      target: 40,
      progress: 87.5,
    },
    {
      id: "4",
      name: "Emily Wilson",
      role: "Project Manager",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EW",
      hoursLogged: 42,
      target: 40,
      progress: 105,
    },
    {
      id: "5",
      name: "David Park",
      role: "Developer",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DP",
      hoursLogged: 36,
      target: 40,
      progress: 90,
    },
  ]

  return (
    <div className="space-y-4">
      {teamMembers.map((member) => (
        <div key={member.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
            <div className="text-sm font-medium">
              {member.hoursLogged} / {member.target} hrs
            </div>
          </div>
          <Progress value={member.progress} className="h-2" />
        </div>
      ))}
    </div>
  )
}
