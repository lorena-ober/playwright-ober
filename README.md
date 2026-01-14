## Planned automated test cases (ParaBank)

1. Login - successful login with valid credentials  
   Expected: Accounts Overview page is displayed and "Log Out" link is visible.

2. Login - invalid credentials show error  
   Expected: Error message is displayed and user stays on login page.

3. Logout - user can log out successfully  
   Expected: User is redirected to the home/login page and "Log In" button is visible.

4. Register - missing required fields validation  
   Expected: Validation errors are shown for required fields.

5. Navigation after login - Accounts Overview loads correctly  
   Expected: Accounts table and heading "Accounts Overview" are visible and URL contains `overview.htm`.
