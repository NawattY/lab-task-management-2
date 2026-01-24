## Session: DOMAIN_MODEL
- Status: In Progress
- Last Updated: Sat Jan 24 2026

## Entities Identified
- User: id, email, password, name, timestamps
- Task: id, title, description, status (string), priority (string), dueDate, userId, collectionId
- Collection: id, title, color, userId

## Enums
- TaskStatus: TODO, COMPLETED (String in DB)
- TaskPriority: LOW, MEDIUM, HIGH (String in DB)

## Relationships
- User 1:N Collection
- User 1:N Task
- Collection 1:N Task
- Task MUST belong to Collection (Default: Inbox)

## Glossary Terms
- Collection: A grouping of tasks (Project/List)
- Inbox: Default collection for new tasks

## Ready for Generation: Yes