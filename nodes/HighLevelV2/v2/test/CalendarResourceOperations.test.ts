// Mock response data for calendar resource operations
export const calendarResourceOperationsMockData = {
  create: {
    resource: {
      id: "resource_6669e4c3a0b142cc43a00e97",
      name: "Conference Room A",
      description: "Large conference room with projector and video conferencing capabilities",
      type: "room",
      quantity: 1,
      isActive: true,
      locationId: "location_123456789",
      createdAt: "2024-06-12T12:14:43.159Z",
      updatedAt: "2024-06-12T12:14:43.159Z"
    }
  },
  get: {
    resource: {
      id: "resource_6669e4c3a0b142cc43a00e97",
      name: "Conference Room A",
      description: "Large conference room with projector and video conferencing capabilities",
      type: "room",
      quantity: 1,
      isActive: true,
      locationId: "location_123456789",
      createdAt: "2024-06-12T12:14:43.159Z",
      updatedAt: "2024-06-12T12:14:43.159Z"
    }
  },
  update: {
    resource: {
      id: "resource_6669e4c3a0b142cc43a00e97",
      name: "Conference Room A - Updated",
      description: "Large conference room with projector and video conferencing capabilities - Updated description",
      type: "room",
      quantity: 2,
      isActive: true,
      locationId: "location_123456789",
      createdAt: "2024-06-12T12:14:43.159Z",
      updatedAt: "2024-06-12T12:20:15.242Z"
    }
  },
  getAll: {
    resources: [
      {
        id: "resource_6669e4c3a0b142cc43a00e97",
        name: "Conference Room A",
        description: "Large conference room with projector and video conferencing capabilities",
        type: "room",
        quantity: 1,
        isActive: true,
        locationId: "location_123456789",
        createdAt: "2024-06-12T12:14:43.159Z",
        updatedAt: "2024-06-12T12:14:43.159Z"
      },
      {
        id: "resource_6669e4c3a0b142cc43a00e98",
        name: "Laptop - Dell XPS 15",
        description: "High-performance laptop for presentations and meetings",
        type: "equipment",
        quantity: 3,
        isActive: true,
        locationId: "location_123456789",
        createdAt: "2024-06-12T10:30:12.455Z",
        updatedAt: "2024-06-12T10:30:12.455Z"
      },
      {
        id: "resource_6669e4c3a0b142cc43a00e99",
        name: "Meeting Room B",
        description: "Small meeting room perfect for team discussions",
        type: "room",
        quantity: 1,
        isActive: false,
        locationId: "location_123456789",
        createdAt: "2024-06-12T09:15:30.123Z",
        updatedAt: "2024-06-12T14:45:22.789Z"
      }
    ],
    meta: {
      total: 3,
      currentPage: 1,
      nextPage: null,
      prevPage: null,
      limit: 20
    }
  },
  delete: {
    success: true,
    message: "Calendar resource deleted successfully"
  }
}; 