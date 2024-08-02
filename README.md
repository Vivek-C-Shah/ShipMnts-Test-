### Email Scheduling System

This is a simple email scheduling system that allows users to schedule emails to be sent at a later time. The system is built using Django and Celery. The system is designed to be used by a single user. The user can schedule emails to be sent at a later time. The user can also view a list of all scheduled emails and delete scheduled emails.

### Features
- Schedule emails to be sent at a later time
- Schedule recurring emails
- View a list of all scheduled emails
- Delete scheduled emails
- View scheduled email

### API Endpoints

- ENDPOINT https://shipmnts-test-msna.onrender.com

- `GET /api/v1/scheduled-emails/` - Get a list of all scheduled emails
- `POST /api/v1/schedule-email/` - Schedule an email or a recurring email
- `GET /api/v1/scheduled-emails/<agentaId>/` - Get a scheduled email
- `DELETE /api/v1/scheduled-emails/<agentaId>/` - Delete a scheduled email