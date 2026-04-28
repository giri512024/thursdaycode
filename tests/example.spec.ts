import { test, expect } from '@playwright/test';

test('register new user on ParaBank', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/about.htm');
  await expect(page).toHaveTitle(/ParaBank/);

  // Navigate to registration
  await page.locator('text=Register').click();
  await expect(page.locator('h1')).toHaveText('Signing up is easy!');

  // Fill registration form
  await page.locator('#customer\\.firstName').fill('xdt');
  await page.locator('#customer\\.lastName').fill('nameuser');
  await page.locator('#customer\\.address\\.street').fill('12873 Test Street');
  await page.locator('#customer\\.address\\.city').fill('Testville');
  await page.locator('#customer\\.address\\.state').fill('TestState');
  await page.locator('#customer\\.address\\.zipCode').fill('12345');
  await page.locator('#customer\\.phoneNumber').fill('1234567890');
  await page.locator('#customer\\.ssn').fill('123-45-6789');

  let UsernameValue = 'RandomUser' + Math.floor(Math.random() * 10000);
  await page.locator('#customer\\.username').fill(UsernameValue);
  await page.locator('#customer\\.password').fill('Tes3t@1234');
  await page.locator('#repeatedPassword').fill('Tes3t@1234');

  await page.getByRole('button', { name: 'Register' }).click();
  await page.waitForTimeout(3000);

  // Verify welcome message
  const text = (await page.textContent('h1') || '').trim();
  if (text === 'Welcome ' + UsernameValue) {
    console.log('Registration successful with username:', UsernameValue);
  } else {
    console.error('Unexpected welcome message:', text);
  }
  await page.screenshot({ path: 'registration_result.png' });
  await page.locator("a[href='logout.htm']").click();
  await page.close();
});
