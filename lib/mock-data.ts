// Mock timesheet entries
export function getMockTimesheetEntries() {
  return [
    {
      id: "entry-1",
      user_id: "user-1",
      project_id: "project-1",
      description: "Website design for Burberry campaign",
      hours: 2,
      date: "2025-05-20",
      billable: true,
      ai_processed: true,
      original_input: "2 hours on 1234-BURB design",
      created_at: "2025-05-20T10:00:00Z",
      updated_at: "2025-05-20T10:00:00Z",
      projects: {
        name: "Burberry Campaign",
        job_number: "1234-BURB",
        clients: {
          name: "Burberry",
        },
      },
    },
    {
      id: "entry-2",
      user_id: "user-1",
      project_id: null,
      description: "Administrative emails and team coordination",
      hours: 1,
      date: "2025-05-20",
      billable: false,
      ai_processed: true,
      original_input: "1 hour on admin emails",
      created_at: "2025-05-20T14:00:00Z",
      updated_at: "2025-05-20T14:00:00Z",
      projects: null,
    },
    {
      id: "entry-3",
      user_id: "user-1",
      project_id: "project-2",
      description: "Client call for Coca-Cola campaign",
      hours: 1.5,
      date: "2025-05-19",
      billable: true,
      ai_processed: true,
      original_input: "1.5 hours on 5678-COCA client call",
      created_at: "2025-05-19T11:00:00Z",
      updated_at: "2025-05-19T11:00:00Z",
      projects: {
        name: "Coca-Cola Summer Campaign",
        job_number: "5678-COCA",
        clients: {
          name: "Coca-Cola",
        },
      },
    },
    {
      id: "entry-4",
      user_id: "user-1",
      project_id: "project-3",
      description: "QA testing for Uber app redesign",
      hours: 3,
      date: "2025-05-18",
      billable: true,
      ai_processed: true,
      original_input: "3 hours on 4321-UBER QA testing",
      created_at: "2025-05-18T09:00:00Z",
      updated_at: "2025-05-18T09:00:00Z",
      projects: {
        name: "Uber App Redesign",
        job_number: "4321-UBER",
        clients: {
          name: "Uber",
        },
      },
    },
    {
      id: "entry-5",
      user_id: "user-1",
      project_id: null,
      description: "Team meeting and sprint planning",
      hours: 2,
      date: "2025-05-17",
      billable: false,
      ai_processed: true,
      original_input: "2 hours on team meeting",
      created_at: "2025-05-17T13:00:00Z",
      updated_at: "2025-05-17T13:00:00Z",
      projects: null,
    },
  ]
}

// Mock projects
export function getMockProjects() {
  return [
    {
      id: "project-1",
      client_id: "client-1",
      name: "Burberry Campaign",
      job_number: "1234-BURB",
      description: "Website and digital assets for Burberry summer campaign",
      budget: 50000,
      status: "Active",
      created_at: "2025-04-01T00:00:00Z",
      updated_at: "2025-04-01T00:00:00Z",
      clients: {
        name: "Burberry",
      },
    },
    {
      id: "project-2",
      client_id: "client-2",
      name: "Coca-Cola Summer Campaign",
      job_number: "5678-COCA",
      description: "Social media campaign for Coca-Cola summer promotion",
      budget: 75000,
      status: "Active",
      created_at: "2025-04-15T00:00:00Z",
      updated_at: "2025-04-15T00:00:00Z",
      clients: {
        name: "Coca-Cola",
      },
    },
    {
      id: "project-3",
      client_id: "client-3",
      name: "Uber App Redesign",
      job_number: "4321-UBER",
      description: "UX/UI redesign for Uber mobile application",
      budget: 120000,
      status: "Active",
      created_at: "2025-03-10T00:00:00Z",
      updated_at: "2025-03-10T00:00:00Z",
      clients: {
        name: "Uber",
      },
    },
    {
      id: "project-4",
      client_id: "client-4",
      name: "Nike Running Campaign",
      job_number: "8765-NIKE",
      description: "Digital marketing campaign for Nike Running",
      budget: 90000,
      status: "Active",
      created_at: "2025-05-01T00:00:00Z",
      updated_at: "2025-05-01T00:00:00Z",
      clients: {
        name: "Nike",
      },
    },
    {
      id: "project-5",
      client_id: "client-5",
      name: "Apple Product Launch",
      job_number: "9876-APPL",
      description: "Marketing materials for new Apple product launch",
      budget: 150000,
      status: "Pending",
      created_at: "2025-05-10T00:00:00Z",
      updated_at: "2025-05-10T00:00:00Z",
      clients: {
        name: "Apple",
      },
    },
  ]
}

// Mock clients
export function getMockClients() {
  return [
    {
      id: "client-1",
      name: "Burberry",
      description: "Luxury fashion brand",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
    {
      id: "client-2",
      name: "Coca-Cola",
      description: "Beverage company",
      created_at: "2025-01-02T00:00:00Z",
      updated_at: "2025-01-02T00:00:00Z",
    },
    {
      id: "client-3",
      name: "Uber",
      description: "Transportation network company",
      created_at: "2025-01-03T00:00:00Z",
      updated_at: "2025-01-03T00:00:00Z",
    },
    {
      id: "client-4",
      name: "Nike",
      description: "Athletic apparel company",
      created_at: "2025-01-04T00:00:00Z",
      updated_at: "2025-01-04T00:00:00Z",
    },
    {
      id: "client-5",
      name: "Apple",
      description: "Technology company",
      created_at: "2025-01-05T00:00:00Z",
      updated_at: "2025-01-05T00:00:00Z",
    },
  ]
}

// Mock team members
export function getMockTeamMembers() {
  return [
    {
      id: "user-1",
      name: "Christopher Belgrave",
      email: "chrisbelgrave@gmail.com",
      role: "Admin",
      hourly_rate: 150,
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-01-01T00:00:00Z",
    },
    {
      id: "user-2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Designer",
      hourly_rate: 120,
      created_at: "2025-01-02T00:00:00Z",
      updated_at: "2025-01-02T00:00:00Z",
    },
    {
      id: "user-3",
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
      hourly_rate: 130,
      created_at: "2025-01-03T00:00:00Z",
      updated_at: "2025-01-03T00:00:00Z",
    },
    {
      id: "user-4",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Project Manager",
      hourly_rate: 140,
      created_at: "2025-01-04T00:00:00Z",
      updated_at: "2025-01-04T00:00:00Z",
    },
    {
      id: "user-5",
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Copywriter",
      hourly_rate: 110,
      created_at: "2025-01-05T00:00:00Z",
      updated_at: "2025-01-05T00:00:00Z",
    },
  ]
}
