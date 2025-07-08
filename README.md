# n8n-nodes-highlevelv2 (BETA)

This is an n8n community node that provides **comprehensive integration** with the HighLevel API v2, featuring **30 resources** with **100+ operations**. It allows you to seamlessly connect your n8n workflows with HighLevel's powerful CRM, marketing automation, and business management platform.

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

## 🚀 Full Feature Overview

This comprehensive n8n community node provides complete coverage of the HighLevel API v2 with:

### **30 Core Resources**
Auth • Blog • Business • Calendar • Calendar Event • Calendar Group • Calendar Resource • Contact • Conversation • Coupon • Custom Field • Custom Objects • Custom Values • Email • Form • Funnel • Media • Notes • Appointment Notes • Object Associations • Opportunity • Product • Redirect • SaaS • Social Planner • Sub-Account • Survey • Task • Tags • User

### **100+ Operations** Including:
- **Full CRUD Operations** across all resources
- **Advanced Search & Filtering** with pagination
- **Bulk Operations** for efficiency
- **File Management** (upload, organize, delete)
- **Relationship Management** (object associations)
- **Marketing Automation** (email templates, social posts, funnels)
- **E-commerce Features** (products, coupons, redirects)
- **Business Management** (sub-accounts, users, SaaS)
- **CRM Features** (contacts, conversations, notes, tags)
- **Analytics & Reporting** (social analytics, funnel metrics)

### **Advanced Features**
- 🔄 **Automatic Pagination** for large datasets
- 🏷️ **Dynamic Custom Fields** with live search
- 🌍 **Timezone Management** with location awareness
- 📧 **Email/Phone Validation** with format checking
- 🔗 **Location-aware Operations** with automatic context injection
- 🎯 **Flexible Tag Processing** (comma-separated or array formats)
- 📁 **File Upload Support** with metadata management
- ⚡ **Comprehensive Error Handling** with detailed responses
- 🔍 **Advanced Search Capabilities** across multiple resources

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

### 🏢 Business Management
- **Create**: Create new businesses with complete contact information
- **Get**: Retrieve specific business details and contact information
- **Get Many**: List multiple businesses with filtering and search capabilities
- **Update**: Modify existing business information including contact details
- **Delete**: Remove businesses from the system

### 📅 Calendar Management
- **Create**: Create new calendars
- **Get**: Retrieve specific calendar details
- **Get Many**: List multiple calendars with filtering options
- **Update**: Modify existing calendar information
- **Delete**: Remove calendars from the system
- **Get Free Slots**: Retrieve available calendar slots for scheduling

### 📅 Calendar Event Management  
- **Create Appointment**: Schedule new appointments with full contact and calendar integration
- **Update Appointment**: Modify existing appointment details, times, and status
- **Get Appointment**: Retrieve specific appointment details by ID
- **Create Block Slot**: Block calendar time slots to prevent bookings
- **Update Block Slot**: Modify existing blocked time slots
- **Get Blocked Slots**: List all blocked time slots with filtering options
- **Delete Event**: Remove appointments or calendar events from the system

### 📅 Calendar Group Management
- **Create**: Create new calendar groups to organize multiple calendars
- **Get Many**: List all calendar groups with filtering and search capabilities
- **Update**: Modify existing calendar group settings and assignments
- **Delete**: Remove calendar groups from the system
- **Disable**: Temporarily disable calendar groups
- **Validate Slug**: Check if a calendar group slug is available for use

### 🔧 Calendar Resource Management
- **Create**: Create new calendar resources like rooms, equipment, or other bookable items
- **Get**: Retrieve specific calendar resource details by ID
- **Get Many**: List all calendar resources with pagination and filtering
- **Update**: Modify existing calendar resource information and settings
- **Delete**: Remove calendar resources from the system

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

### 🏷️ Custom Fields Management
- **Create**: Add new custom fields
- **Update**: Modify existing custom fields
- **Get**: Retrieve custom field details
- **Delete**: Remove custom fields
- **Create Folder**: Organize custom fields in folders
- **Get Folder**: Retrieve folder information
- **Update Folder**: Modify folder properties
- **Delete Folder**: Remove custom field folders

### 🗂️ Custom Objects Management
- **Create Custom Object**: Define new custom object schemas
- **Get Object Schema**: Retrieve custom object schema details
- **Get All Objects**: List all custom objects for a location
- **Update Object Schema**: Modify existing custom object schemas
- **Create Record**: Add new records to custom objects
- **Get Record**: Retrieve specific custom object records
- **Update Record**: Modify existing custom object records
- **Delete Record**: Remove records from custom objects
- **Search Records**: Find records using filters and queries

### 📊 Custom Values Management
- **Create**: Add new custom values with various data types
- **Get**: Retrieve specific custom value details
- **Get All**: List all custom values with filtering options
- **Update**: Modify existing custom value properties
- **Delete**: Remove custom values from the system

### 📧 Email Management
- **Create Template**: Design email templates
- **Update Template**: Modify existing templates
- **Delete Template**: Remove email templates
- **Get Templates**: List available templates
- **Get Campaigns**: Retrieve email campaign data

### 📋 Forms Management
- **Get Forms**: List available forms
- **Get Form Submissions**: Retrieve form responses
- **Upload File**: Handle form file uploads

### 🕳️ Funnel Management
- **Get All Funnels**: List all funnels with filtering and search
- **Get Funnel Pages**: Retrieve all pages within a specific funnel
- **Get Page Count**: Get detailed count statistics for funnel pages

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

### 📝 Appointment Notes Management
- **Create**: Add new appointment-specific notes to track appointment details
- **Get Many**: List all appointment notes with filtering by contact, user, or appointment
- **Update**: Modify existing appointment note content
- **Delete**: Remove appointment notes from the system

### 🔗 Object Associations Management
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

### 📱 Social Planner Management
- **Create Post**: Create social media posts
- **Schedule Post**: Schedule posts for later publication
- **Get Posts**: Retrieve social media posts
- **Get Post**: Get a specific social media post
- **Update Post**: Update existing social media posts
- **Delete Post**: Delete social media posts
- **Get Social Accounts**: List connected social accounts
- **Get Analytics**: Retrieve social media analytics and performance data

### 🏢 Sub-Account Management
- **Create Sub-Account**: Add new sub-accounts
- **Get Sub-Accounts**: List sub-accounts
- **Create User**: Add users to sub-accounts
- **Get Users**: List sub-account users

### 📊 Survey Management
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

### 🔧 Core Functionality
- **30 Resource Types**: Complete coverage of HighLevel API v2
- **100+ Operations**: Full CRUD operations across all resources
- **Advanced Search**: Powerful filtering and search capabilities
- **Bulk Operations**: Efficient handling of multiple records
- **Real-time Data**: Live integration with HighLevel platform

### 🚀 Advanced Automation
- **Automatic Pagination**: Seamlessly handles large datasets
- **Location-aware Operations**: Automatic location context injection
- **Dynamic Field Mapping**: Smart custom field integration with live search
- **Timezone Management**: Automatic timezone handling and conversion
- **Email/Phone Validation**: Built-in format validation and verification
- **Tag Processing**: Flexible tag management (comma-separated or array formats)
- **File Upload Support**: Handle attachments in conversations, forms, and media library
- **Error Handling**: Comprehensive error handling with detailed reporting

### 📊 Data Management
- **Custom Objects & Fields**: Create and manage custom data structures
- **Object Associations**: Define relationships between different data types
- **Custom Values**: Typed custom values with categories and organization
- **Media Library**: Complete file and folder management
- **Notes & Tags**: Rich contact annotation and categorization

### 🎯 Marketing & Sales
- **Contact Management**: Complete CRM with custom fields and validation
- **Conversation Handling**: SMS, email, calls with file attachments
- **Social Media Planning**: Multi-platform post creation and scheduling
- **Email Campaigns**: Template management and campaign tracking
- **Funnel Analytics**: Page performance and conversion tracking
- **Product Catalog**: Inventory management with bulk operations
- **Coupon System**: Discount management with usage tracking

### 🏢 Business Operations
- **Sub-Account Management**: Multi-location business support
- **User Administration**: Role-based access and user management
- **SaaS Integration**: Subscription and billing management
- **Task Management**: Project tracking with advanced search
- **Survey Collection**: Form submission and response handling
- **Redirect Management**: URL management and traffic routing

### 🔒 Security & Authentication
- **OAuth2 Integration**: Secure token-based authentication
- **Location Scoping**: Automatic location context for all operations
- **API Versioning**: Consistent API version management
- **Rate Limit Handling**: Intelligent request throttling

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

### Create Calendar Resource
```javascript
// Create a calendar resource (room, equipment, etc.)
{
  "resource": "calendarResource",
  "operation": "create",
  "name": "Conference Room A",
  "additionalFields": {
    "description": "Large conference room with projector and video conferencing",
    "type": "room",
    "quantity": 1,
    "isActive": true
  }
}
```

### Create Appointment
```javascript
// Create a new appointment
{
  "resource": "calendarEvent",
  "operation": "createAppointment",
  "calendarId": "cal_123456789",
  "contactId": "contact_123456789", 
  "startTime": "2023-12-01T10:00:00.000Z",
  "endTime": "2023-12-01T11:00:00.000Z",
  "additionalFields": {
    "title": "Sales Consultation",
    "appointmentStatus": "confirmed",
    "assignedUserId": "user_123456789",
    "address": "123 Main St, City, State 12345",
    "notes": "Initial sales consultation meeting"
  }
}
```

### Social Media Management
```javascript
// Create a social media post
{
  "resource": "socialPlanner",
  "operation": "createPost",
  "locationId": "loc_123",
  "content": "Check out our latest offer! #sale #discount",
  "socialAccounts": ["facebook", "instagram"],
  "additionalFields": {
    "mediaUrls": "https://example.com/image1.jpg,https://example.com/image2.jpg",
    "hashtags": "sale,discount,promotion",
    "postType": "post",
    "postImmediately": true
  }
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
```

## Testing

The node includes comprehensive test coverage for all API operations, data validation, error handling, authentication flows, and pagination functionality.

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


