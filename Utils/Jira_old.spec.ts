import { Version3Client } from 'jira.js';
import  { test, expect} from '@playwright/test';

export class jiraupdate{
   
async logDefect(Title:any,desc:any) {
  
    const client = new Version3Client({
    host:"https://playwrighttest.atlassian.net/",
    authentication: {
        basic: {
        email: "smitha.d@testingxperts.com",
        apiToken: "ATATT3xFfGF0rDHR-DsRbhRgB6tHZpq1_uMnrWCAgPU9-W7KZVoxVoulXaikQk5-de9Aj6jk3btRwCeGmEKKH6lvuKP_t2XxvahHjPOWHWbVBmLYoKhTJVdf6M6kDev8aHgRh-fIq6wE07V1YvWpOiQ25SI7Ihm7qaaQX8qf8HGqWs0N9Ome2co=926C5436",
            },
        },
    newErrorHandling: true,
});
console.log("inside Jir")

    const projects = await client.projects.getProject("DEM")
    console.log("After Jir"+await client.projects.getProject("DEM"))
   /* if (projects) {
      const project = projects;
      console.log("inside if"+project.key)
      const { id } = await client.issues.createIssue({
        fields: {
          summary: Title,
          //attachments:screenshot,
          issuetype: {
            name: 'Bug'
          },
          description: desc,
          project: {
            key: project.key,
          },
        }
      });
  
      const issue = await client.issues.getIssue({ issueIdOrKey: id });
  
      console.log(`Issue '${issue.fields.summary}' was successfully added to '${project.name}' project.`);
    } else {
  
    const myself = await client.myself.getCurrentUser();

    const { id } = await client.projects.createProject({
      key: 'PROJECT1',
      name: "My Project2",
      leadAccountId: myself.accountId,
      projectTypeKey: 'software',
    });

    const project = await client.projects.getProject({ projectIdOrKey: id.toString() });

    console.log(`Project '${project.name}' was successfully created.`);
  }*/
}
}



