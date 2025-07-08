// Mock data for Business operations testing

// Mock functions for business operations testing
export const mockBusinessResponse = {
	business: {
		id: 'business_123',
		name: 'Test Business',
		address: '123 Main St',
		city: 'Test City',
		state: 'Test State',
		postalCode: '12345',
		country: 'US',
		phone: '+1234567890',
		email: 'test@business.com',
		website: 'https://testbusiness.com',
		description: 'A test business',
		locationId: 'location_456',
		createdAt: '2023-01-01T00:00:00.000Z',
		updatedAt: '2023-01-01T00:00:00.000Z',
	},
	success: true,
};

export const mockBusinessListResponse = {
	businesses: [
		{
			id: 'business_123',
			name: 'Test Business 1',
			address: '123 Main St',
			city: 'Test City',
			state: 'Test State',
			postalCode: '12345',
			country: 'US',
			phone: '+1234567890',
			email: 'test1@business.com',
			website: 'https://testbusiness1.com',
			description: 'Test business 1',
			locationId: 'location_456',
			createdAt: '2023-01-01T00:00:00.000Z',
			updatedAt: '2023-01-01T00:00:00.000Z',
		},
		{
			id: 'business_124',
			name: 'Test Business 2',
			address: '456 Oak Ave',
			city: 'Another City',
			state: 'Another State',
			postalCode: '67890',
			country: 'US',
			phone: '+0987654321',
			email: 'test2@business.com',
			website: 'https://testbusiness2.com',
			description: 'Test business 2',
			locationId: 'location_456',
			createdAt: '2023-01-02T00:00:00.000Z',
			updatedAt: '2023-01-02T00:00:00.000Z',
		},
	],
	meta: {
		total: 2,
		count: 2,
		limit: 50,
		offset: 0,
	},
	success: true,
};

export const mockBusinessDeleteResponse = {
	success: true,
	message: 'Business deleted successfully',
}; 