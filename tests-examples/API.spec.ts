import { request } from '@playwright/test';
import { test, expect } from '@playwright/test';
const REPO = 'test-repo-1';
const USER = 'github-username';

// Request context is reused by all tests in the file.
let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://catfact.ninja/fact',
    
  });
})
test.afterAll(async ({ }) => {
  // Dispose all responses.
  await apiContext.dispose();
});
test('Create a user', async ({ request }) => {
  const _response=await request.post("https://reqres.in/api/users", {
      data: {
              "name": "Nitish",
              "job": "QA",
             
          }
  });
  console.log((await _response.json()).id)
  const id_fetch=(await _response.json()).id
  expect(_response.status()).toBe(201);
  expect(_response.ok()).toBeTruthy();
  
})
test.only('Get the details of user', async ({ request }) => {
  const newIssue = await request.get('https://reqres.in/api/users/2', {  });
  console.log((await newIssue.json()).data.first_name)
  expect ((await newIssue.json()).data.first_name).toEqual("Janet")
    /*expect.objectContaining({
    "data": {
      "avatar": "https://reqres.in/img/faces/2-image.jpg", 
      "email": "janet.weaver@reqres.in", 
      "first_name": "Janet",
       "id": 2, 
       "last_name": "Weaver"},
    "support": {
      "text": "To keep ReqRes free, contributions towards server costs are appreciated!", 
      "url": "https://reqres.in/#support-heading"}
   }));*/
  expect(newIssue.ok()).toBeTruthy();
})

test('last created issue should be first in the list', async ({ page }) => {
  const newIssue = await apiContext.get('http://restapi.adequateshop.com/api/Tourist', {  });
  //console.log(JSON.stringify(newIssue))
  expect(newIssue.ok()).toBeTruthy();

  
});
test.skip('last created issue sho list', async ({ page }) => {
    const newIssue = await apiContext.post(' http://restapi.adequateshop.com/api/Tourist/210609', {
        data:
        {
            tourist_name: "sdfjhdsjfh89345",
             tourist_email: "mikeerer209@gmail.com",
             tourist_location: "Paris"
        }
      });
   
    expect(newIssue.ok()).toBeTruthy();
  
    
  });
