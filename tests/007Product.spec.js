import { test, expect, chromium, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
const users_data=[
  ["Al-Amin","Alhmed",faker.internet.email()],
  ["Sumon","Alhmed",faker.internet.email()],
  ["Rasel","Alhmed",faker.internet.email()],
  ["Raselz","Alhmedz",faker.internet.email()],
  ["Rosella","Alameda",faker.internet.email()]
]
// users_data.forEach(data=>{
//   test(`create user ${data[0]}`, async ({page}) => {
//       await page.goto('https://demo.nopcommerce.com/');
//       await page.getByRole('link', { name: 'Register' }).click();
//       await page.getByLabel('Male', { exact: true }).check();
//       await page.getByLabel('Female').check();
//       await page.getByLabel('First name:').click(); 
//       await page.getByLabel('First name:').fill(data[0]);
//       await page.getByLabel('Last name:').click();
//       await page.getByLabel('Last name:').fill(data[1]);
//       await page.locator('select[name="DateOfBirthDay"]').selectOption('17');
//       await page.locator('select[name="DateOfBirthMonth"]').selectOption('3');
//       await page.locator('select[name="DateOfBirthYear"]').selectOption('1929');
//       await page.getByLabel('Email:').click();
//       await page.getByLabel('Email:').fill(data[2]);
//       await page.getByLabel('Company name:').click();
//       await page.getByLabel('Company name:').fill('BS-23');
//       await page.getByLabel('Newsletter:').uncheck();
//       await page.getByLabel('Password:', { exact: true }).click();
//       await page.getByLabel('Password:', { exact: true }).fill('@tania12');
//       await page.getByLabel('Confirm password:').click();
//       await page.getByLabel('Confirm password:').fill('@tania12');
//       await page.getByRole('button', { name: 'Register' }).click();
//       await expect(page.locator('body')).toContainText('Your registration completed');
//       await delay(2000);
//   });
// });
const test_data=JSON.parse(JSON.stringify(require("../testdata/testdata.json")));
test('Login with valid credentials',async({page}) => {
  await page.goto("https://demo.applitools.com/index.html");
  await page.locator("//input[@id='username']").fill(test_data.user.username);
  await page.locator("//input[@id='password']").fill(test_data.user.password);
  await page.locator("//a[@id='log-in']").click();
  await page.close();  
});

test('data driven test automation', async ({ page }) => {
    const data = require('../testdata/orange_hrm.json');
    for (const user_data of data) {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.locator("input[placeholder='Username']").fill(user_data.username);
        await page.locator("input[placeholder='Password']").fill(user_data.password);
        await page.locator("button:has-text('Login')").click();
        if (user_data.username === 'Admin' && user_data.password === 'admin123') {
            await page.locator("i.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon").click();
            await page.waitForTimeout(2000); // Wait for the logout option to be visible
            await page.locator("a:has-text('Logout')").click();
        } else {
            const errorMessage = page.locator("p.oxd-text.oxd-text--p.oxd-alert-content-text");
            await expect(errorMessage).toHaveText(user_data.expected);
        }
    }
});
