// Mock data for Calendar Event operations testing

// Mock functions for calendar event operations testing
export const mockAppointmentResponse = {
	appointment: {
		id: 'appointment_123',
		calendarId: 'calendar_456',
		contactId: 'contact_789',
		locationId: 'location_abc',
		title: 'Test Appointment',
		appointmentStatus: 'confirmed',
		assignedUserId: 'user_def',
		address: '123 Test Street, Test City, TS 12345',
		notes: 'This is a test appointment for development',
		startTime: '2023-12-01T10:00:00.000Z',
		endTime: '2023-12-01T11:00:00.000Z',
		dateCreated: '2023-01-01T00:00:00.000Z',
		dateUpdated: '2023-01-01T00:00:00.000Z',
	},
};

export const mockBlockedSlotResponse = {
	blockedSlot: {
		id: 'blocked_123',
		calendarId: 'calendar_456',
		userId: 'user_def',
		locationId: 'location_abc',
		title: 'Blocked Time Slot',
		startTime: '2023-12-01T12:00:00.000Z',
		endTime: '2023-12-01T13:00:00.000Z',
		dateCreated: '2023-01-01T00:00:00.000Z',
		dateUpdated: '2023-01-01T00:00:00.000Z',
	},
};

export const mockBlockedSlotsListResponse = {
	blockedSlots: [
		{
			id: 'blocked_123',
			calendarId: 'calendar_456',
			userId: 'user_def',
			locationId: 'location_abc',
			title: 'Blocked Time Slot 1',
			startTime: '2023-12-01T12:00:00.000Z',
			endTime: '2023-12-01T13:00:00.000Z',
			dateCreated: '2023-01-01T00:00:00.000Z',
			dateUpdated: '2023-01-01T00:00:00.000Z',
		},
		{
			id: 'blocked_456',
			calendarId: 'calendar_789',
			userId: 'user_abc',
			locationId: 'location_abc',
			title: 'Blocked Time Slot 2',
			startTime: '2023-12-01T14:00:00.000Z',
			endTime: '2023-12-01T15:00:00.000Z',
			dateCreated: '2023-01-01T00:00:00.000Z',
			dateUpdated: '2023-01-01T00:00:00.000Z',
		},
	],
	meta: {
		total: 2,
		count: 2,
		currentPage: 1,
		nextPageUrl: null,
		prevPageUrl: null,
	},
};

export const mockDeleteEventResponse = {
	success: true,
	message: 'Event deleted successfully',
}; 