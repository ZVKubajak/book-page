# Book Page

## Setup
1. Ensure you create a `.env` filed based on the `.env-example` in the `server` folder. Ask team for JWT_SECRET value
2. At the root project level in the terminal run `npm run install`
3. `cd` into `client/db`
4. Run `psql -U postgres` enter your password
5. Run `\i schema.sql` to create the database
6. Go back to the root project level and run `npm run seed` to add the test user to the User table

## Running the app
1. Run `npm run build`
2. Run `npm run start:dev`
