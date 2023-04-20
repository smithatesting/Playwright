import { Version3Client, Version3Models  } from 'jira.js';
import  { test, expect} from '@playwright/test';
import { IssueAttachments } from 'jira.js/out/version2';

export class jiraupdate{
   
async logDefect(Title:any,desc:any,screenshotPath:string,attaachbuffer:Buffer) {
  
    const client = new Version3Client({
    host:"https://playwrighttest.atlassian.net/",
    authentication: {
        basic: {
        email: "smitha.d@testingxperts.com",
        apiToken: "ATATT3xFfGF05gCsqRnyPKN_M6jgG77XlFS35vRXUWow8d37USLRagX65-sbO4YkD382tL9d-nEzesbPITkdli83YarVwqOjBa6PWOL7Oq6fgizd03ofYaqBpkAgA6IZc4aCjwKaRX4VXCIjGsKYHVLxBKYeQ-6yhIKKSoKxoWPwJdPQndUOCIk=6C254EE3"
            },
        },
    newErrorHandling: true,
});
    const projects = await client.projects.getProject( 'DEM');
   console.log("screen"+screenshotPath)
    if (projects) {
      const project = projects;
  
      const { id } = await client.issues.createIssue({
        fields: {
          summary:Title,
          description:desc,
          issuetype: {
            name: 'Bug'
          },
          project: {
            key: project.key,
          },
        }
      });
      console.log('Before Issue ');
     const issue = await client.issues.getIssue({ issueIdOrKey: id });
     console.log(`Before Issue '${issue.fields.summary}' was successfully added to '${project.name}' project.`);
     await client.issueAttachments.addAttachment({
      issueIdOrKey:id,
      attachment:{
        filename:screenshotPath,
        file:attaachbuffer,
      }
     })
      
      console.log(`Issue '${issue.fields.summary}' was successfully added to '${project.name}' project.`);
    }
    else {
  
    const myself = await client.myself.getCurrentUser();

    const { id } = await client.projects.createProject({
      key: 'PROJECT1',
      name: "My Project2",
      leadAccountId: myself.accountId,
      projectTypeKey: 'software',
    });

    const project = await client.projects.getProject({ projectIdOrKey: id.toString() });
   
  
    console.log(`Project '${project.name}' was successfully created.`);
  }
}
}



