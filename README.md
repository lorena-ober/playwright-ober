Test Cases

1. Successful login with a newly registered user: (/login.spec.ts)
Verifies that a user who has just completed the registration process can successfully authenticate using valid credentials and access the application.

2. Successful user logout: (/logout.spec.ts)
Verifies that an authenticated user can successfully log out of the application and is redirected back to the login page.

3. Register link opens the Register page:(/navigation.spec.ts)
Verifies that selecting the Register navigation link redirects the user to the registration page and that the registration form is displayed correctly.

4. Forgot login info link opens the Customer Lookup page:(/navigation.spec.ts)
Verifies that selecting the Forgot login info? link redirects the user to the Customer Lookup page and that the appropriate page content is displayed.

5. Registration displays an error when confirmation password does not match: (/register.spec.ts)
Verifies that the registration process displays a validation error when the password and confirmation password fields contain different values.