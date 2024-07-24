export class User {
  
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string | null,
        public passwordEnabled: boolean | null,
        public emailVerified: boolean | null,
        public image: string | null,
        public createdAt: Date,
        public lastLoginAt: Date|null,
        public username: string|null,
        public tfaEnabled: boolean|null,
        public birthday: Date|null,
        public gender: string|null,
    ) { }
  }
    
// //   
// activityLogs: ActivityLog[] = [],
// comments: Comment[] = [],
// assignedProjects: Project[] = [],
// timeEntries: TimeEntry[] = [],
// createdWorkflows: Workflow[] = [],
// updatedWorks: Workflow[] = [],
// assignedClients: Client[] = [],
// assignedContacts: Contact[] = [],
// assignedDeals: Deal[] = [],
// organizations: Organization[] = [],
// assignedTasks: Task[] = [],
// notifications: Notification[] = []