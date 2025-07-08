// Mock data for Calendar Group operations testing

// Mock functions for calendar group operations testing
export const mockCalendarGroupResponse = {
	group: {
		id: 'group_123',
		name: 'Test Calendar Group',
		slug: 'test-calendar-group',
		description: 'A test calendar group for development',
		locationId: 'location_456',
		calendarIds: ['calendar_1', 'calendar_2', 'calendar_3'],
		isActive: true,
		teamId: 'team_789',
		createdAt: '2023-01-01T00:00:00.000Z',
		updatedAt: '2023-01-01T00:00:00.000Z',
	},
};

export const mockCalendarGroupsResponse = {
	groups: [
		{
			id: 'group_123',
			name: 'Test Calendar Group',
			slug: 'test-calendar-group',
			description: 'A test calendar group for development',
			locationId: 'location_456',
			calendarIds: ['calendar_1', 'calendar_2'],
			isActive: true,
			teamId: 'team_789',
			createdAt: '2023-01-01T00:00:00.000Z',
			updatedAt: '2023-01-01T00:00:00.000Z',
		},
		{
			id: 'group_456',
			name: 'Another Calendar Group',
			slug: 'another-calendar-group',
			description: 'Another test calendar group',
			locationId: 'location_456',
			calendarIds: ['calendar_3', 'calendar_4'],
			isActive: false,
			teamId: 'team_789',
			createdAt: '2023-01-02T00:00:00.000Z',
			updatedAt: '2023-01-02T00:00:00.000Z',
		},
	],
	total: 2,
	count: 2,
};

export const mockCalendarGroupDeleteResponse = {
	success: true,
	message: 'Calendar group deleted successfully',
};

export const mockCalendarGroupValidateResponse = {
	isValid: true,
	slug: 'test-calendar-group',
	message: 'Slug is available',
	suggestions: [],
};

export const mockCalendarGroupValidateInvalidResponse = {
	isValid: false,
	slug: 'existing-group',
	message: 'Slug already exists',
	suggestions: ['existing-group-1', 'existing-group-2', 'existing-group-new'],
};

// Test data for calendar group operations
export const testCalendarGroupData = {
	create: {
		name: 'Test Calendar Group',
		slug: 'test-calendar-group',
		additionalFields: {
			description: 'A test calendar group for development',
			calendarIds: ['calendar_1', 'calendar_2'],
			isActive: true,
			teamId: 'team_789',
		},
	},
	update: {
		groupId: 'group_123',
		updateFields: {
			name: 'Updated Calendar Group',
			description: 'Updated description',
			isActive: false,
		},
	},
	delete: {
		groupId: 'group_123',
	},
	disable: {
		groupId: 'group_123',
	},
	validateSlug: {
		slug: 'test-calendar-group',
	},
	getAll: {
		returnAll: false,
		limit: 10,
		additionalFields: {
			search: 'test',
		},
	},
}; 