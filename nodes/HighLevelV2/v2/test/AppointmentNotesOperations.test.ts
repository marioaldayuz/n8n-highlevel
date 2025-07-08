// Mock response data for appointment notes operations
export const appointmentNotesOperationsMockData = {
  create: {
    note: {
      id: "6669e4c3a0b142cc43a00e97",
      body: "This is a follow-up note for the appointment scheduled tomorrow.",
      contactId: "vcGaRBUhfEqKMJ2jFzqLi",
      userId: "user123",
      appointmentId: "appointment456",
      createdAt: "2024-06-12T12:14:43.159Z",
      updatedAt: "2024-06-12T12:14:43.159Z"
    }
  },
  update: {
    note: {
      id: "6669e4c3a0b142cc43a00e97",
      body: "This is an updated follow-up note for the appointment scheduled tomorrow.",
      contactId: "vcGaRBUhfEqKMJ2jFzqLi",
      userId: "user123",
      appointmentId: "appointment456",
      createdAt: "2024-06-12T12:14:43.159Z",
      updatedAt: "2024-06-12T12:20:15.242Z"
    }
  },
  getAll: {
    notes: [
      {
        id: "6669e4c3a0b142cc43a00e97",
        body: "This is a follow-up note for the appointment scheduled tomorrow.",
        contactId: "vcGaRBUhfEqKMJ2jFzqLi",
        userId: "user123",
        appointmentId: "appointment456",
        createdAt: "2024-06-12T12:14:43.159Z",
        updatedAt: "2024-06-12T12:14:43.159Z"
      },
      {
        id: "6669e4c3a0b142cc43a00e98",
        body: "Appointment confirmed with client. Reminder sent via SMS.",
        contactId: "vcGaRBUhfEqKMJ2jFzqLi",
        userId: "user456",
        appointmentId: "appointment789",
        createdAt: "2024-06-12T10:30:12.455Z",
        updatedAt: "2024-06-12T10:30:12.455Z"
      }
    ],
    meta: {
      total: 2,
      currentPage: 1,
      nextPage: null,
      prevPage: null,
      limit: 20
    }
  },
  delete: {
    success: true,
    message: "Appointment note deleted successfully"
  }
}; 