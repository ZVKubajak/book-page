# Book Page

## Setup
1. At the root project level in the terminal run `npm run install`
2. `cd` into `client/db`
3. Run `psql -U postgres` enter your password
4. Run `\i schema.sql` to create the database
5. Go back to the root project level and run `npm run seed` to add the test user to the User table
6. Ensure you create a `.env` filed based on the `.env-example` in the `server` folder. Ask team for JWT_SECRET value

## Running the app
1. Run `npm run build`
2. Run `npm run start:dev`
