**CRUD Up?**

Your team has started a new business in Uptown for dog-enthusiasts that also need to vacation with out their beloved pet.

As an MVP, you will create an application that allows owners to

check in their pet
check out their pet
update their pet's info
remove their pet altogether
You'll use CRUD to make this happen.

IMPORTANT: Please include a database.txt file in your submitted Git repo that has all the queries you used to create your database and tables.

Implementation Details
Guidance on how to build your app.

Database Tables

Create the following tables in your mu database. Don't forget to add your primary and foreign keys!

Table 1: Owners

Because owners can have multiple pets, it's best to include this in a separate table.

Columns

first name
last name
Table 2: Pets

Remember that pets must belong to an owner.

Columns

name
breed
color
Table 3: Visits

We'll keep a log of each visit. Remember that visits must be linked to a pet.

Columns

check-in date
check-out date
Views

This app will have one page: Owners and Pets
