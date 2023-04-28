import { expect, test } from '@playwright/test'
import {AdactinHome}  from '..//Pages/Adactin.pages';
import { jiraupdate } from '../Utils/Jira.spec';
import { AzureReporterOptions } from '@alex_neo/playwright-azure-reporter/dist/playwright-azure-reporter';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const records = parse(fs.readFileSync(path.join(__dirname, '..//Data/testdata.csv')), {
  columns: true,
  skip_empty_lines: true
});
const user_name=records[0].username
const password=records[0].password
test.describe('Adactin', () => {
    let adactin
    let jupdate
    var location = 'Sydney';

    test('[97] login-101', async ({ page }) => {
        
        adactin = new AdactinHome(page)

        await adactin.navigate()
        await adactin.loginWithCredentials(user_name, password)
        await expect(page).toHaveTitle('Adactin.com - Search Hotel');
    })
    test('[101] 102-To verify whether the check-out date field accepts a later date than check i date', async ({ page }) => {
        adactin = new AdactinHome(page)

        await adactin.navigate()
        await adactin.loginWithCredentials(user_name, password)
        await expect(page).toHaveTitle('Adactin.com - Search Hotel');

        const now = new Date()
        let d1 = now.toLocaleDateString().split('/')
        let mm = d1[0]
        let yy = d1[2]
        console.log(mm)
        let d2 = Number(d1[1]) + 7;
        let checkIn = mm + '/' + d2 + '/' + yy
        console.log(mm + '/' + d2 + '/' + yy)
        let d3 = Number(d1[1]) + 5
        let checkOut = mm + '/' + d3 + '/' + yy
        console.log(checkOut)

        await adactin.location.selectOption('Sydney')
        await adactin.hotel.selectOption('Hotel Creek')
        await adactin.roomType.selectOption('Standard')
        //await page.locator ('#room_nos').selectOption('1')
        await adactin.dateIn.fill(checkIn)
        await adactin.dateOut.fill(checkOut)
        await adactin.search.click();

        const tt = await page.locator("span[id='checkin_span']").textContent()
        await expect(tt).toContain('Check-In Date shall be before than Check-Out Date')
        // await expect(page).toMatch()
        // await expect(page).toContain('Check-In Date shall be before than Check-Out Date')


    })
    test('[102] 103-To check if error is reported if check-out date field is in the past', async ({ page }) => {

        adactin = new AdactinHome(page)

        await adactin.navigate()
        await adactin.loginWithCredentials(user_name, password)
        await expect(page).toHaveTitle('Adactin.com - Search Hotel');

        const now = new Date()
        let d1 = now.toLocaleDateString().split('/')
        let mm = d1[0]
        let yy = d1[2]
        console.log(mm)
        let d2 = Number(d1[1]) - 5;
        let checkIn = mm + '/' + d2 + '/' + yy
        console.log(mm + '/' + d2 + '/' + yy)
        let d3 = Number(d1[1]) - 3
        let checkOut = mm + '/' + d3 + '/' + yy
        console.log(checkOut)

        await adactin.location.selectOption('Sydney')
        await adactin.hotel.selectOption('Hotel Creek')
        await adactin.roomType.selectOption('Standard')
        //await page.locator ('#room_nos').selectOption('1')
        await adactin.dateIn.fill(checkIn)
        await adactin.dateOut.fill(checkOut)
        await adactin.search.click();

        const ee = await page.locator("span[id='checkin_span']").textContent();
        await expect(ee).toContain('Check-In Date shall be before than Check-Out Date')

    })

    test('[103] 104 -location verification', async ({ page }) => {
        adactin = new AdactinHome(page)

        await adactin.navigate()
        await adactin.loginWithCredentials(user_name, password)
        await expect(page).toHaveTitle('Adactin.com - Search Hotel');

        const now = new Date()
        let d1 = now.toLocaleDateString().split('/')
        let mm = d1[0]
        let yy = d1[2]
        console.log(mm)
        let d3 = Number(d1[1]) + 1
        let checkOut = mm + '/' + d3 + '/' + yy
        console.log(checkOut)

        await adactin.location.selectOption(location)
        await adactin.hotel.selectOption('Hotel Creek')
        await adactin.roomType.selectOption('Standard')
        await adactin.dateOut.fill(checkOut)
        await adactin.search.click();

        const tt = await page.locator("//input[contains(@id,'location') and @type='text']")
        const t1 = await tt.getAttribute('value')
        const t2 = t1?.toString().trim()
        console.log('location' + t2 + 'location')
        console.log('location=' + location)
        expect(t1).toEqual(location)

        //await page .locator ('text=')
        if (t1 === location) {
            console.log('success')
        }
        else {
            console.log('fail')
            test.fail
        }

    })

    test('[104] 105-To verify whether Check-in date and Check-out date are being displayed in Select Hotel page', async ({ page }) => {
        adactin = new AdactinHome(page)

        await adactin.navigate()
        await adactin.loginWithCredentials(user_name, password)
        await expect(page).toHaveTitle('Adactin.com - Search Hotel');
        const now = new Date()
        const date = now.getDate()
        const dat1 = date + 1
        console.log(dat1)
        const month = now.getMonth()
        const month1 = month + 1

        let checkOut = + '/' + date + '/' + now.getFullYear()
        console.log(checkOut)
        page.waitForTimeout(50000)

        await adactin.location.selectOption(location)
        await adactin.hotel.selectOption('Hotel Creek')
        await adactin.roomType.selectOption('Standard')
        await adactin.dateOut.fill(checkOut)
        await adactin.search.click();

        var dat2=date.toString()

        //get the date from the page and compare
        const ee = await page.locator("//input[contains(@name,'arr_date') and @type='text']").getAttribute('value')
        await expect(ee).toContain(dat2)
    })

    test('[105] 106-Verify the no.of rooms', async ({ page }) => {
        adactin = new AdactinHome(page)
        const room = "1";
        await adactin.navigate()
        await adactin.loginWithCredentials(user_name, password)
        await expect(page).toHaveTitle('Adactin.com - Search Hotel');

        const now = new Date()
        let d1 = now.toLocaleDateString().split('/')
        let mm = d1[0]
        let yy = d1[2]
        console.log(mm)
        let d3 = Number(d1[1]) + 1
        let checkOut = mm + '/' + d3 + '/' + yy
        console.log(checkOut)

        await adactin.location.selectOption(location)
        await adactin.hotel.selectOption('Hotel Creek')
        await adactin.roomType.selectOption('Standard')
        await page.locator('#room_nos').selectOption('1')
        await adactin.dateOut.fill(checkOut)
        await adactin.search.click();

        //Rooms
        const rooms = await page.locator("//input[contains(@name,'rooms') and @type='text']").getAttribute('value')
        await expect(rooms).toContain(room)
    })


test.afterEach(async ({page}, testInfo) => {
        let Jiraupdate = new jiraupdate
       
        console.log('status',testInfo.status)
       if (testInfo.status !== testInfo.expectedStatus && !(testInfo.retry)){
            const screenshotPath = testInfo.outputPath(`failure.png`);
    // Add it to the report.
            testInfo.attachments.push({ name: 'screenshot', path: screenshotPath, contentType: 'image/png' });
    // Take the screenshot itself.
            const screenshot:Buffer = await page.screenshot();
           await page.screenshot({ path: screenshotPath, timeout: 5000 });
          console.log(`${testInfo.title} did not un as expected!`);
          Jiraupdate.logDefect(testInfo.title,testInfo.error?.message, "error.png",screenshot),
          await new Promise(f => setTimeout(f, 10000));
         
        }
      });
      
})
test.describe('Apitest', () => {
test('Create a user', async ({ request }) => {
  const _response=await request.post("https://reqres.in/api/users", {
      data: {
              "name": "Nitish",
              "job": "QA"
          }
  });
  console.log("API")
  expect(_response.status()).toBe(201);
  expect(_response.ok()).toBeTruthy();
})
test('Get the details of user', async ({ request }) => {
    const newIssue = await request.get('https://reqres.in/api/users/2', {  });
    expect ((await newIssue.json()).data.first_name).toEqual("Janet")
    expect(newIssue.ok()).toBeTruthy();
  })
  
});

   
  
