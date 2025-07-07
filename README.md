# n8n-nodes-highlevelv2 (BETA)

This is an n8n community node that provides comprehensive integration with the HighLevel API v2. It allows you to seamlessly connect your n8n workflows with HighLevel's powerful CRM, marketing automation, and business management platform.

Get your 30 Day FREE Trial of [HighLevel](https://www.gohighlevel.com/marioaldayuz) by clicking [HERE](https://www.gohighlevel.com/marioaldayuz)!

[HighLevel](https://www.gohighlevel.com/marioaldayuz) is an all-in-one business platform that combines CRM, marketing automation, website building, funnel creation, appointment scheduling, and more into a single unified system.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

[Installation](#installation)  
[Resources & Operations](#resources--operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Features](#features)  
[Usage Examples](#usage-examples)  
[Testing](#testing)  
[Development](#development)  
[Resources](#resources)  

## Installation

Simply go to N8N Settings > Community Nodes > Install > `n8n-nodes-highlevelv2` and you're off to the races!

## Resources & Operations

This node provides access to the following HighLevel resources and operations:

### 🔐 Authentication
- **Get Location Access Token**: Retrieve location-specific access tokens for API operations

### 📝 Blog Management
- **Create**: Create new blog posts
- **Update**: Modify existing blog posts
- **Get**: Retrieve specific blog posts
- **Get All**: List all blog posts
- **Delete**: Remove blog posts

### 📅 Calendar
- **Get Free Slots**: Retrieve available calendar slots for scheduling

### 👥 Contact Management
- **Create or Update**: Create new contacts or update existing ones (upsert operation)
- **Get**: Retrieve specific contact details
- **Get Many**: List multiple contacts with filtering options
- **Update**: Modify existing contact information
- **Delete**: Remove contacts from the system

### 💬 Conversation Management
- **Create Conversation**: Start new conversations
- **Get Conversation**: Retrieve conversation details
- **Update Conversation**: Modify conversation properties
- **Delete Conversation**: Remove conversations
- **Send Message**: Send messages within conversations
- **Get Messages**: Retrieve conversation messages
- **Add Inbound Message**: Process incoming messages
- **Add External Outbound Call**: Log external calls
- **Cancel Scheduled Email/Message**: Cancel pending communications
- **Upload File Attachment**: Add files to conversations
- **Get Email/Recording/Transcription**: Retrieve communication assets
- **Download Transcription**: Download call transcriptions
- **Update Message Status**: Modify message delivery status
- **Search Conversations**: Find conversations using filters

### 🎫 Coupon Management
- **Create**: Create new discount coupons
- **Get**: Retrieve specific coupon details
- **Get Many**: List multiple coupons with filtering options
- **Update**: Modify existing coupon information
- **Delete**: Remove coupons from the system

### 🏷️ Custom Fields
- **Create**: Add new custom fields
- **Update**: Modify existing custom fields
- **Get**: Retrieve custom field details
- **Delete**: Remove custom fields
- **Create Folder**: Organize custom fields in folders
- **Get Folder**: Retrieve folder information
- **Update Folder**: Modify folder properties
- **Delete Folder**: Remove custom field folders

### 📧 Email Management
- **Create Template**: Design email templates
- **Update Template**: Modify existing templates
- **Delete Template**: Remove email templates
- **Get Templates**: List available templates
- **Get Campaigns**: Retrieve email campaign data

### 📋 Forms
- **Get Forms**: List available forms
- **Get Form Submissions**: Retrieve form responses
- **Upload File**: Handle form file uploads

### 📁 Media Management
- **Get List of Files**: Retrieve all files and folders in the media library
- **Upload File**: Upload files to the media library with metadata
- **Delete File or Folder**: Remove files or folders from the media library

### 📝 Notes Management
- **Create**: Add new notes to contacts
- **Get**: Retrieve specific note details
- **Get All**: List all notes for a contact with pagination
- **Update**: Modify existing note content
- **Delete**: Remove notes from contacts

### 🎯 Opportunity Management
- **Create**: Add new opportunities
- **Update**: Modify opportunity details
- **Get**: Retrieve specific opportunities
- **Get All**: List multiple opportunities

### 🛍️ Product Management
- **Create**: Add new products to inventory
- **Get**: Retrieve specific product details
- **Get Many**: List multiple products with filtering options
- **Update**: Modify existing product information
- **Delete**: Remove products from inventory
- **Bulk Update**: Update multiple products at once

### 🔀 Redirect Management
- **Create**: Create new URL redirects (301/302)
- **Get All**: List all redirects with filtering options
- **Update**: Modify existing redirect rules
- **Delete**: Remove redirects from the system

### 🕳️ Funnel Management
- **Get All Funnels**: List all funnels with filtering and search
- **Get Funnel Pages**: Retrieve all pages within a specific funnel
- **Get Page Count**: Get detailed count statistics for funnel pages

### 🗂️ Custom Objects
- **Create Custom Object**: Define new custom object schemas
- **Get Object Schema**: Retrieve custom object schema details
- **Get All Objects**: List all custom objects for a location
- **Update Object Schema**: Modify existing custom object schemas
- **Create Record**: Add new records to custom objects
- **Get Record**: Retrieve specific custom object records
- **Update Record**: Modify existing custom object records
- **Delete Record**: Remove records from custom objects
- **Search Records**: Find records using filters and queries

### 📊 Custom Values
- **Create**: Add new custom values with various data types
- **Get**: Retrieve specific custom value details
- **Get All**: List all custom values with filtering options
- **Update**: Modify existing custom value properties
- **Delete**: Remove custom values from the system
- **Advanced Filtering**: Filter by type, category, active status

### 🔗 Object Associations
- **Create Association**: Define relationships between different object types
- **Get Association by ID**: Retrieve association details by ID
- **Get Association by Object Keys**: Find associations between specific objects
- **Get Association Key by Key Name**: Retrieve association keys by name
- **Update Association**: Modify existing association definitions
- **Delete Association**: Remove association definitions
- **Get All Associations**: List all associations for a location
- **Create Relation**: Establish relations between specific object instances
- **Get All Relations by Record ID**: Retrieve relations for specific records
- **Delete Relation**: Remove specific object relations

### 🏢 SaaS Management
- **Enable SaaS**: Activate SaaS features for locations
- **Disable SaaS**: Deactivate SaaS features
- **Bulk Enable SaaS**: Enable SaaS for multiple locations
- **Get SaaS Locations**: List SaaS-enabled locations
- **Get SaaS Plan**: Retrieve plan information
- **Get Agency Plans**: List available agency plans
- **Get Location Subscription Details**: Retrieve subscription info
- **Get Locations by Stripe ID**: Find locations by payment ID
- **Update Subscription**: Modify subscription settings
- **Update Rebilling**: Adjust billing configurations
- **Pause Location**: Temporarily suspend location access

### 📱 Social Planner
- **Create Post**: Create social media posts
- **Schedule Post**: Schedule posts for later publication
- **Get Posts**: Retrieve social media posts
- **Get Social Accounts**: List connected social accounts

### 🏢 Sub-Account Management
- **Create Sub-Account**: Add new sub-accounts
- **Get Sub-Accounts**: List sub-accounts
- **Create User**: Add users to sub-accounts
- **Get Users**: List sub-account users

### 📊 Surveys
- **Get Surveys**: List available surveys
- **Get Survey Submissions**: Retrieve survey responses

### ✅ Task Management
- **Create**: Add new tasks to the system
- **Get**: Retrieve specific task details
- **Get Many**: List tasks for a contact
- **Update**: Modify existing tasks
- **Delete**: Remove tasks
- **Search**: Search tasks with advanced filters

### 🏷️ Tags Management
- **Add Tags**: Add multiple tags to contacts
- **Remove Tags**: Remove specific tags from contacts
- **Bulk Operations**: Handle multiple tags at once
- **Format Support**: Accept comma-separated or array format

### 👤 User Management
- **Create User**: Add new users
- **Get User**: Retrieve user details
- **Get Users by Location**: List users for specific locations
- **Update User**: Modify user information
- **Delete User**: Remove users from the system

## Credentials

This node uses OAuth2 authentication with the HighLevel API. You'll need to:

1. **Create a HighLevel App**: Register your application in the HighLevel Developer Portal
2. **Get OAuth2 Credentials**: Obtain your Client ID and Client Secret
3. **Configure Authentication**: Set up OAuth2 credentials in n8n with:
   - Client ID
   - Client Secret
   - Authorization URL: `https://marketplace.leadconnectorhq.com/oauth/chooselocation`
   - Access Token URL: `https://services.leadconnectorhq.com/oauth/token`
   - Scope: As required by your use case

The node automatically handles location-specific token management and API versioning.

## Compatibility

- **Minimum n8n version**: 1.0.0
- **Node.js version**: >=20.15
- **API Version**: HighLevel API v2 (2021-07-28)

## Features

### Advanced Functionality
- **Automatic Pagination**: Handles large datasets automatically
- **Custom Field Management**: Dynamic custom field integration
- **Timezone Support**: Automatic timezone handling
- **Email/Phone Validation**: Built-in validation for contact data
- **Tag Processing**: Flexible tag management (comma-separated or array)
- **File Upload Support**: Handle file attachments in conversations and forms
- **Error Handling**: Comprehensive error handling and reporting

### Pre/Post Processing
- **Data Transformation**: Automatic data formatting for API compatibility
- **Custom Field Mapping**: Dynamic field mapping for contacts
- **Note Management**: Automatic note addition for contacts
- **Location ID Injection**: Automatic location context management

## Usage Examples

### Create or Update Contact
```javascript
// Basic contact creation with email validation
{
  "resource": "contact",
  "operation": "create",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "tags": "prospect,website-lead"
}
```

### Send Message in Conversation
```javascript
// Send a message to an existing conversation
{
  "resource": "conversation",
  "operation": "sendMessage",
  "conversationId": "conv_123",
  "message": "Hello! How can I help you today?",
  "type": "SMS"
}
```

### Create Social Media Post
```javascript
// Schedule a social media post
{
  "resource": "socialPlanner",
  "operation": "schedulePost",
  "message": "Check out our latest offer!",
  "platform": "facebook",
  "scheduleDate": "2024-01-15T10:00:00Z"
}
```

### Create Coupon
```javascript
// Create a discount coupon
{
  "resource": "coupon",
  "operation": "create",
  "name": "Summer Sale",
  "code": "SUMMER2024",
  "discountType": "percentage",
  "discountValue": 20,
  "description": "20% off summer collection",
  "startDate": "2024-06-01T00:00:00Z",
  "endDate": "2024-08-31T23:59:59Z",
  "usageLimit": 100,
  "minimumAmount": 50
}
```

### Create Product
```javascript
// Create a new product
{
  "resource": "product",
  "operation": "create",
  "name": "Premium T-Shirt",
  "price": 29.99,
  "description": "High-quality cotton t-shirt",
  "category": "Clothing",
  "sku": "TSHIRT-001",
  "stockQuantity": 100,
  "status": "active",
  "trackInventory": true,
  "tags": "clothing,premium,cotton",
  "weight": 0.3,
  "taxRate": 8.5
}
```

### Media Management
```javascript
// Get list of files from media library
{
  "resource": "media",
  "operation": "getFiles",
  "additionalFields": {
    "folderId": "folder-123",
    "search": "image",
    "sortBy": "createdAt",
    "sortOrder": "desc",
    "limit": 50
  }
}

// Upload a file to media library
{
  "resource": "media",
  "operation": "uploadFile",
  "fileData": "base64encodedfiledata...",
  "fileName": "marketing-image.jpg",
  "additionalFields": {
    "folderId": "folder-456",
    "description": "Marketing campaign image",
    "tags": "marketing,campaign,image",
    "isPublic": true
  }
}

// Delete a file from media library
{
  "resource": "media",
  "operation": "deleteFile",
  "fileId": "file-789",
  "additionalFields": {
    "forceDelete": false
  }
}
```

### Redirect Management
```javascript
// Create a URL redirect
{
  "resource": "redirect",
  "operation": "create",
  "sourceUrl": "/old-product-page",
  "targetUrl": "/new-product-page",
  "additionalFields": {
    "redirectType": "301",
    "description": "Product page redesign redirect",
    "isActive": true
  }
}

// Get all redirects with filtering
{
  "resource": "redirect",
  "operation": "getAll",
  "additionalFields": {
    "status": "active",
    "search": "product",
    "limit": 50,
    "offset": 0
  }
}

// Update an existing redirect
{
  "resource": "redirect",
  "operation": "update",
  "redirectId": "redirect-123",
  "updateFields": {
    "targetUrl": "/updated-target-page",
    "redirectType": "302",
    "isActive": false
  }
}

// Delete a redirect
{
  "resource": "redirect",
  "operation": "delete",
  "redirectId": "redirect-123"
}
```

### Funnel Management
```javascript
// Get all funnels with filtering
{
  "resource": "funnel",
  "operation": "getFunnels",
  "additionalFields": {
    "status": "active",
    "category": "lead-generation",
    "search": "marketing",
    "limit": 20,
    "offset": 0
  }
}

// Get pages for a specific funnel
{
  "resource": "funnel",
  "operation": "getFunnelPages",
  "funnelId": "funnel-123",
  "additionalFields": {
    "pageType": "landing",
    "status": "active",
    "limit": 50
  }
}

// Get page count statistics for a funnel
{
  "resource": "funnel",
  "operation": "getPageCount",
  "funnelId": "funnel-123",
  "additionalFields": {
    "pageType": "all",
    "status": "active"
  }
}
```

### Create Custom Object and Record
```javascript
// Create a custom object schema
{
  "resource": "customObjects",
  "operation": "createObject",
  "name": "Property Listings",
  "description": "Real estate property listings",
  "schema": {
    "type": "object",
    "properties": {
      "address": { "type": "string" },
      "price": { "type": "number" },
      "bedrooms": { "type": "integer" },
      "bathrooms": { "type": "number" },
      "squareFootage": { "type": "number" },
      "propertyType": { "type": "string" },
      "description": { "type": "string" },
      "listingDate": { "type": "string", "format": "date" }
    },
    "required": ["address", "price", "propertyType"]
  },
  "displayField": "address",
  "enableApiAccess": true
}

// Create a record in the custom object
{
  "resource": "customObjects",
  "operation": "createRecord",
  "objectId": "obj_123",
  "recordData": {
    "address": "123 Main St, City, State 12345",
    "price": 350000,
    "bedrooms": 3,
    "bathrooms": 2.5,
    "squareFootage": 1800,
    "propertyType": "Single Family",
    "description": "Beautiful family home with modern amenities",
    "listingDate": "2024-01-15"
  }
}
```

### Create Object Association and Relation
```javascript
// Create an association between contacts and opportunities
{
  "resource": "objectAssociations",
  "operation": "createAssociation",
  "name": "Contact-Opportunity",
  "description": "Associates contacts with opportunities",
  "fromObjectType": "contact",
  "toObjectType": "opportunity",
  "cardinality": "ONE_TO_MANY"
}

// Create a relation between a specific contact and opportunity
{
  "resource": "objectAssociations",
  "operation": "createRelation",
  "associationId": "assoc_123",
  "fromObjectId": "contact_456",
  "toObjectId": "opportunity_789",
  "metadata": {
    "relationshipType": "primary_contact",
    "confidence": 0.95,
    "source": "crm_integration"
  }
}

// Get all relations for a specific contact
{
  "resource": "objectAssociations",
  "operation": "getAllRelationsByRecordId",
  "associationId": "assoc_123",
  "filterOptions": {
    "recordId": "contact_456"
  }
}
```

### Notes Management
```javascript
// Create a note for a contact
{
  "resource": "notes",
  "operation": "create",
  "contactId": "contact_123",
  "body": "Follow up with customer regarding their inquiry about pricing.",
  "additionalFields": {
    "userId": "user_456"
  }
}

// Get all notes for a contact
{
  "resource": "notes",
  "operation": "getAll",
  "contactId": "contact_123",
  "additionalFields": {
    "limit": 20,
    "offset": 0
  }
}

// Get a specific note
{
  "resource": "notes",
  "operation": "get",
  "contactId": "contact_123",
  "noteId": "note_789"
}

// Update a note
{
  "resource": "notes",
  "operation": "update",
  "contactId": "contact_123",
  "noteId": "note_789",
  "updateFields": {
    "body": "Updated: Customer confirmed interest in premium package.",
    "userId": "user_456"
  }
}

// Delete a note
{
  "resource": "notes",
  "operation": "delete",
  "contactId": "contact_123",
  "noteId": "note_789"
}
```

### Tags Management
```javascript
// Add tags to a contact
{
  "resource": "tags",
  "operation": "addTags",
  "contactId": "contact_123",
  "tags": "vip,priority-follow-up,interested-in-premium",
  "additionalFields": {
    "userId": "user_456",
    "source": "workflow"
  }
}

// Add tags using array format
{
  "resource": "tags",
  "operation": "addTags",
  "contactId": "contact_123",
  "tags": ["hot-lead", "scheduled-demo", "high-value"],
  "additionalFields": {
    "source": "automated-scoring"
  }
}

// Remove tags from a contact
{
  "resource": "tags",
  "operation": "removeTags",
  "contactId": "contact_123",
  "tags": "old-tag,outdated-info",
  "additionalFields": {
    "userId": "user_456",
    "source": "cleanup"
  }
}

// Remove multiple tags using array format
{
  "resource": "tags",
  "operation": "removeTags",
  "contactId": "contact_123",
  "tags": ["cold-lead", "unresponsive", "low-priority"],
  "additionalFields": {
    "source": "bulk-cleanup"
  }
}
```

### Task Search
```javascript
// Search tasks with filters
{
  "resource": "task",
  "operation": "search",
  "additionalFields": {
    "locationId": "loc_123",
    "status": "pending",
    "assignedTo": "user_456",
    "dueDateFrom": "2024-01-01T00:00:00Z",
    "dueDateTo": "2024-12-31T23:59:59Z",
    "query": "follow up",
    "limit": 50,
    "offset": 0
  }
}

// Search completed tasks for a specific contact
{
  "resource": "task",
  "operation": "search",
  "additionalFields": {
    "contactId": "contact_789",
    "status": "completed",
    "limit": 20
  }
}

// Search tasks by content or title
{
  "resource": "task",
  "operation": "search",
  "additionalFields": {
    "query": "customer onboarding",
    "limit": 25
  }
}
```

### Custom Values Management
```javascript
// Create a custom value
{
  "resource": "customValues",
  "operation": "create",
  "name": "Lead Source",
  "value": "Website",
  "additionalFields": {
    "description": "Where the lead originated from",
    "type": "text",
    "category": "lead-tracking",
    "isActive": true,
    "sortOrder": 1
  }
}

// Get all custom values with filtering
{
  "resource": "customValues",
  "operation": "getAll",
  "additionalFields": {
    "category": "lead-tracking",
    "type": "text",
    "isActive": "true",
    "search": "source",
    "limit": 50,
    "offset": 0
  }
}

// Get a specific custom value
{
  "resource": "customValues",
  "operation": "get",
  "customValueId": "cv_123"
}

// Update a custom value
{
  "resource": "customValues",
  "operation": "update",
  "customValueId": "cv_123",
  "updateFields": {
    "name": "Lead Source Updated",
    "value": "Social Media",
    "description": "Updated lead source tracking",
    "category": "marketing",
    "sortOrder": 5
  }
}

// Delete a custom value
{
  "resource": "customValues",
  "operation": "delete",
  "customValueId": "cv_123"
}

// Create custom values for different data types
{
  "resource": "customValues",
  "operation": "create",
  "name": "Customer Rating",
  "value": "5",
  "additionalFields": {
    "type": "number",
    "category": "customer-feedback",
    "description": "Customer satisfaction rating (1-5)"
  }
}

{
  "resource": "customValues",
  "operation": "create",
  "name": "Is VIP Customer",
  "value": "true",
  "additionalFields": {
    "type": "boolean",
    "category": "customer-status",
    "description": "Indicates if customer has VIP status"
  }
}

{
  "resource": "customValues",
  "operation": "create",
  "name": "Website URL",
  "value": "https://example.com",
  "additionalFields": {
    "type": "url",
    "category": "contact-info",
    "description": "Customer's website URL"
  }
}
```

## Testing

The node includes comprehensive test coverage for:

- All API operations and resources
- Data validation and transformation
- Error handling scenarios
- Authentication flows
- Pagination functionality
- Custom field management
- File upload operations

Run tests with:
```bash
npm test
```

## Development

### Project Structure
```
nodes/HighLevelV2/
├── __schema__/           # JSON schemas for all operations
├── v2/
│   ├── description/      # Operation descriptions
│   ├── test/            # Test files
│   ├── GenericFunctions.ts
│   └── HighLevelV2.node.ts
├── HighLevel.node.json
└── highLevel.svg
```

### Building
```bash
npm run build
```

### Development Mode
```bash
npm run dev
```

### Linting
```bash
npm run lint
npm run lintfix
```

## Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/#community-nodes)
- [HighLevel API Documentation](https://highlevel.stoplight.io/docs/integrations)
- [HighLevel Developer Portal](https://marketplace.leadconnectorhq.com/)
- [n8n Workflow Automation](https://n8n.io/)
- [Project Repository](https://github.com/marioaldayuz/n8n-highlevel)

## Contributing

This is an open-source project. Contributions are welcome! Please:

1. Fork the repository at [https://github.com/marioaldayuz/n8n-highlevel](https://github.com/marioaldayuz/n8n-highlevel)
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - See [LICENSE.md](LICENSE.md) for details.


