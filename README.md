## Donation Platform API - RESTful Endpoints

This Node.js Express server powers a sophisticated donation platform for a matching site, meticulously designed to adhere to REST principles. It offers a comprehensive range of API endpoints that seamlessly handle diverse functionalities, enhancing the user experience throughout the donation and matching processes.

## Technology Stack

- **Node.js**: Utilize the powerful JavaScript runtime for robust server-side application development.
- **Express.js**: Harness the flexibility of this web application framework for efficient API creation.
- **MongoDB with Mongoose**: Leverage the versatility of a NoSQL database, utilizing Mongoose as an ODM for seamless data storage and retrieval.

## Testing API Routes

For streamlined testing of API routes, leverage the convenience of the VS Code REST Client extension. Execute API requests directly from the provided "route.rest" file, eliminating reliance on external tools such as Postman.


### Users

- `GET /users`: Retrieve a list of all users.
- `GET /users/:id`: Retrieve detailed information about a specific user.
- `POST /users`: Create a new user with essential details.
- `PUT /users/:id`: Update user information efficiently.
- `DELETE /users/:id`: Delete a user account when needed.

### Fundraisers

- `GET /fundraisers`: Browse through all fundraisers available.
- `GET /fundraisers/:id`: Obtain in-depth insights into a particular fundraiser.
- `POST /fundraisers`: Initiate a new fundraiser with relevant details.
- `PUT /fundraisers/:id`: Modify the goal of a specific fundraiser.
- `DELETE /fundraisers/:id`: Terminate a fundraiser that has fulfilled its purpose.
- `POST /fundraisers/:id/donate`: Contribute to a fundraiser with a donation.

### Groups

- `GET /groups`: Explore the list of all groups associated with the platform.
- `GET /groups/:id`: Access detailed information about a specific group.
- `POST /groups`: Create a new group and establish its purpose.
- `PUT /groups/:id`: Update the membership of a particular group.
- `DELETE /groups/:id`: Dissolve a group that has completed its mission.

### Donations

- `GET /donations`: View a comprehensive record of all donations made.
- `GET /donations/:id`: Examine the specifics of a particular donation.
- `POST /donations`: Initiate a new donation and contribute to a cause.
- `PUT /donations/:id`: Adjust the amount of a specific donation.
- `DELETE /donations/:id`: Revoke a donation if necessary.

### Funds

- `GET /funds`: Get an overview of all funds within the platform.
- `GET /funds/:id`: Access detailed information about a specific fund.
- `POST /funds`: Create a new fund and define its objectives.
- `PUT /funds/:id`: Update the groups associated with a fund.
- `DELETE /funds/:id`: Close a fund once its purpose is fulfilled.

### Campaign Management

- `GET /manageCampaign/:id`: Access detailed campaign information for efficient management.
- `GET /manageCampaign/:id/groups`: Retrieve a list of groups associated with a campaign.
- `GET /manageCampaign/:id/donations`: Review all donations linked to a campaign.

### Make a Donation

- `POST /funds/:fundId/:groupId/:donorId`: Seamlessly make a donation to a specific fund and group.




