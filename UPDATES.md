# N8N HighLevel Node Updates

This file tracks all major updates and changes to the N8N HighLevel node package.

## Version 2.5.0 - January 24, 2025

### 🔧 New Calendar Resource Management Added

**Date**: January 24, 2025  
**Time**: 18:00 UTC  
**Author**: Development Team  

#### New Features
- **Calendar Resource Resource**: Complete management operations for calendar resources (rooms, equipment, etc.)
  - ✅ **Create Calendar Resource**: Create new calendar resources like rooms, equipment, or other bookable items
  - ✅ **Get Calendar Resource**: Retrieve specific calendar resource details by ID
  - ✅ **Get Many Calendar Resources**: List all calendar resources with pagination and filtering
  - ✅ **Update Calendar Resource**: Modify existing calendar resource information and settings
  - ✅ **Delete Calendar Resource**: Remove calendar resources from the system

#### Technical Implementation
- Added `CalendarResourceDescription.ts` with complete operation definitions
- Created schema files for all 5 calendar resource operations:
  - `create.json` - Calendar resource creation response schema
  - `get.json` - Single calendar resource retrieval schema
  - `update.json` - Calendar resource modification schema
  - `getAll.json` - Calendar resources list with pagination and filtering
  - `delete.json` - Calendar resource deletion confirmation schema
- Updated main node configuration to include calendarResource resource
- Added comprehensive test coverage with mock data
- Updated documentation with calendar resource management examples

#### API Endpoints Covered
- `POST /calendars/resources` - Create calendar resources
- `GET /calendars/resources/{resourceId}` - Get calendar resource by ID
- `GET /calendars/resources` - List calendar resources with pagination
- `PUT /calendars/resources/{resourceId}` - Update calendar resources
- `DELETE /calendars/resources/{resourceId}` - Delete calendar resources

#### Field Support
- **Name**: Resource name (required for creation)
- **Description**: Detailed resource description
- **Type**: Resource type (room, equipment, etc.)
- **Quantity**: Number of available units
- **Active Status**: Enable/disable resource availability
- **Location Association**: Automatic location context injection
- **Pagination Support**: Handle large datasets efficiently

#### Benefits
- **Resource Management**: Organize and track bookable resources across locations
- **Booking Integration**: Enable resource-based appointment scheduling
- **Inventory Control**: Track quantity and availability of resources
- **Flexible Categorization**: Support for different resource types and descriptions
- **Workflow Automation**: Seamlessly integrate with existing calendar workflows

---

## Version 2.4.0 - January 24, 2025

### 📝 New Appointment Notes Resource Added

**Date**: January 24, 2025  
**Time**: 17:30 UTC  
**Author**: Development Team  

#### New Features
- **Appointment Notes Resource**: Complete management operations for appointment-specific notes
  - ✅ **Create Appointment Note**: Add new appointment-specific notes to track appointment details
  - ✅ **Get Many Appointment Notes**: List all appointment notes with filtering by contact, user, or appointment
  - ✅ **Update Appointment Note**: Modify existing appointment note content
  - ✅ **Delete Appointment Note**: Remove appointment notes from the system

#### Technical Implementation
- Added `AppointmentNotesDescription.ts` with complete operation definitions
- Created schema files for all 4 appointment notes operations:
  - `create.json` - Appointment note creation response schema
  - `update.json` - Appointment note modification schema
  - `getAll.json` - Appointment notes list with pagination and filtering
  - `delete.json` - Appointment note deletion confirmation schema
- Updated main node configuration to include appointmentNotes resource
- Added comprehensive test coverage with mock data
- Updated documentation with appointment notes examples

#### API Endpoints Covered
- `POST /notes/` - Create appointment notes
- `GET /notes/` - List appointment notes with filtering
- `PUT /notes/{noteId}` - Update appointment notes
- `DELETE /notes/{noteId}` - Delete appointment notes

#### Field Support
- **Contact Association**: Link notes to specific contacts
- **Appointment Association**: Associate notes with specific appointments
- **User Tracking**: Track which user created/modified notes
- **Rich Content**: Support for detailed note content
- **Flexible Filtering**: Filter by contact, user, or appointment ID
- **Pagination Support**: Handle large datasets efficiently

#### Benefits
- **Appointment Tracking**: Keep detailed records of appointment-specific information
- **Team Collaboration**: Share appointment notes across team members
- **Client History**: Build comprehensive appointment history per contact
- **Workflow Integration**: Seamlessly integrate with existing appointment workflows

---

## Version 2.3.0 - January 24, 2025

### 📅 New Calendar Event Resource Added

**Date**: January 24, 2025  
**Time**: 16:45 UTC  
**Author**: Development Team  

#### New Features
- **Calendar Event Resource**: Complete appointment and blocked slot management for HighLevel calendars
  - ✅ **Create Appointment**: Schedule new appointments with full contact and calendar integration
  - ✅ **Update Appointment**: Modify existing appointment details, times, and status
  - ✅ **Get Appointment**: Retrieve specific appointment details by ID
  - ✅ **Create Block Slot**: Block calendar time slots to prevent bookings
  - ✅ **Update Block Slot**: Modify existing blocked time slots
  - ✅ **Get Blocked Slots**: List all blocked time slots with filtering options
  - ✅ **Delete Event**: Remove appointments or calendar events from the system

#### Technical Implementation
- Added `CalendarEventDescription.ts` with complete operation definitions
- Created schema files for all 7 calendar event operations:
  - `createAppointment.json` - Full appointment creation schema
  - `updateAppointment.json` - Appointment modification schema
  - `getAppointment.json` - Single appointment retrieval schema
  - `createBlockSlot.json` - Blocked slot creation schema
  - `updateBlockSlot.json` - Blocked slot modification schema
  - `getBlockedSlots.json` - Blocked slots list with pagination
  - `deleteEvent.json` - Event deletion response schema
- Updated main node configuration to include calendar event resource
- Added comprehensive test coverage with mock data
- Updated documentation with calendar event examples

#### API Endpoints Covered
- `POST /calendars/events/appointments` - Create appointments
- `PUT /calendars/events/appointments/{id}` - Update appointments
- `GET /calendars/events/appointments/{id}` - Get appointment details
- `POST /calendars/blocked-slots` - Create blocked time slots
- `PUT /calendars/blocked-slots/{id}` - Update blocked slots
- `GET /calendars/blocked-slots` - List blocked slots with filtering
- `DELETE /calendars/events/{id}` - Delete calendar events

#### Field Support
- Full appointment lifecycle management
- Contact and calendar associations
- User assignment and status tracking
- Time slot blocking and management
- Address and notes support
- Date/time handling with proper formatting

---

## Version 2.2.0 - January 24, 2025

### 📅 New Calendar Group Resource Added

**Date**: January 24, 2025  
**Time**: 16:15 UTC  
**Author**: Development Team  

#### New Features
- **Calendar Group Resource**: Complete management operations for HighLevel calendar groups
  - ✅ **Create Calendar Group**: Create new calendar groups with calendars assignment
  - ✅ **Get Many Calendar Groups**: List all calendar groups with search and filtering
  - ✅ **Update Calendar Group**: Modify existing calendar group settings and assignments
  - ✅ **Delete Calendar Group**: Remove calendar groups from the system
  - ✅ **Disable Calendar Group**: Temporarily disable calendar groups
  - ✅ **Validate Slug**: Check if calendar group slugs are available for use

#### Technical Implementation
- Added `CalendarGroupDescription.ts` with complete operation definitions
- Created schema files for all 6 calendar group operations
- Integrated calendar group resource into main node configuration
- Added comprehensive test coverage in `CalendarGroupOperations.test.ts`
- Updated documentation with usage examples and API patterns

#### API Endpoints Covered
- `GET /calendar-groups/` - List calendar groups
- `POST /calendar-groups/` - Create calendar group
- `PUT /calendar-groups/{groupId}` - Update calendar group
- `DELETE /calendar-groups/{groupId}` - Delete calendar group
- `PUT /calendar-groups/{groupId}/disable` - Disable calendar group
- `GET /calendar-groups/validate/slug` - Validate group slug

#### Benefits
- **Team Organization**: Group multiple calendars for better team management
- **Streamlined Booking**: Single interface for multiple calendar availability
- **Advanced Management**: Full CRUD operations with slug validation
- **Integration Ready**: Complete API coverage for calendar group workflows

---

## Version 2.1.0 - January 24, 2025

### 🏢 New Business Resource Added

**Date**: January 24, 2025  
**Time**: 15:30 UTC  
**Author**: Development Team  

#### New Features
- **Business Resource**: Complete CRUD operations for HighLevel businesses
  - ✅ **Create Business**: Add new businesses with full contact information
  - ✅ **Get Business**: Retrieve specific business details by ID
  - ✅ **Get Many Businesses**: List all businesses with pagination and search
  - ✅ **Update Business**: Modify existing business information
  - ✅ **Delete Business**: Remove businesses from the system

#### Technical Implementation
- Added `BusinessDescription.ts` with complete operation definitions
- Created schema files for all business operations:
  - `create.json` - Business creation response schema
  - `get.json` - Single business retrieval schema
  - `getAll.json` - Business list response schema with pagination
  - `update.json` - Business update response schema
  - `delete.json` - Business deletion confirmation schema
- Updated main node configuration to include business resource
- Added comprehensive test coverage with mock responses
- Integrated with existing location-aware operations

#### API Endpoints Implemented
Following the official HighLevel API documentation:
- `POST /businesses/` - Create business
- `GET /businesses/{businessId}/` - Get business
- `GET /businesses/` - Get businesses by location
- `PUT /businesses/{businessId}/` - Update business
- `DELETE /businesses/{businessId}/` - Delete business

#### Fields Supported
**Required Fields:**
- `name` - Business name (required for creation)

**Optional Fields:**
- `address` - Physical address
- `city` - City location
- `state` - State/province
- `postalCode` - ZIP/postal code
- `country` - Country
- `phone` - Contact phone number
- `email` - Contact email address
- `website` - Business website URL
- `description` - Business description

#### Features
- **Location-aware operations** with automatic location ID injection
- **Pagination support** for listing operations
- **Search functionality** for filtering businesses by name
- **Comprehensive error handling** with detailed responses
- **Input validation** for email and phone formats
- **Flexible field mapping** for create and update operations

#### Documentation Updates
- Updated README.md with business resource documentation
- Added usage examples for business operations
- Updated resource count from 25 to 26 core resources
- Added business operations to the features overview

#### Testing
- Created `BusinessOperations.test.ts` with comprehensive test coverage
- Added mock responses for all business operations
- Included edge cases and error scenarios

---

## Previous Versions

### Version 2.0.0 - Initial Release
- Complete HighLevel API v2 integration
- 25 core resources with 100+ operations
- OAuth2 authentication
- Advanced features and automation capabilities

---

## Update Notes

- All updates follow semantic versioning
- Breaking changes are clearly documented
- New features are backwards compatible unless noted
- API endpoint changes follow HighLevel documentation precisely
- Tests are included with all new features 