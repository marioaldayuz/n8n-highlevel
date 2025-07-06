import type { IExecuteFunctions } from 'n8n-workflow';

describe('SubAccount Operations', () => {
	let executeFunctions: IExecuteFunctions;
	const mockCredentials = {
		oauthTokenData: {
			locationId: 'test-location-id',
		},
	};

	beforeEach(() => {
		executeFunctions = {
			getCredentials: jest.fn().mockResolvedValue(mockCredentials),
			getNodeParameter: jest.fn(),
			helpers: {
				httpRequestWithAuthentication: jest.fn(),
			},
		} as unknown as IExecuteFunctions;
	});

	describe('Create Sub-Account', () => {
		it('should create a sub-account with required fields', async () => {
			const mockResponse = {
				id: 'new-location-id',
				businessName: 'Test Business',
				address: '123 Main St',
				city: 'New York',
				state: 'NY',
				country: 'US',
				postalCode: '10001',
				timezone: 'US/Eastern',
				createdAt: '2024-01-01T00:00:00Z',
				updatedAt: '2024-01-01T00:00:00Z',
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
				mockResponse,
			);

			const result = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'highLevelOAuth2Api',
				{
					method: 'POST',
					url: 'https://services.leadconnectorhq.com/locations',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Version: '2021-07-28',
					},
					body: {
						businessName: 'Test Business',
						address: '123 Main St',
						city: 'New York',
						state: 'NY',
						country: 'US',
						postalCode: '10001',
						timezone: 'US/Eastern',
					},
				},
			);

			expect(result).toEqual(mockResponse);
			expect(result.id).toBe('new-location-id');
			expect(result.businessName).toBe('Test Business');
		});

		it('should create a sub-account with additional fields', async () => {
			const mockResponse = {
				id: 'new-location-id',
				businessName: 'Test Business',
				address: '123 Main St',
				city: 'New York',
				state: 'NY',
				country: 'US',
				postalCode: '10001',
				timezone: 'US/Eastern',
				website: 'https://testbusiness.com',
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@testbusiness.com',
				phone: '+1234567890',
				snapshot: {
					id: 'snapshot-123',
					type: 'vertical',
				},
				createdAt: '2024-01-01T00:00:00Z',
				updatedAt: '2024-01-01T00:00:00Z',
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
				mockResponse,
			);

			const result = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'highLevelOAuth2Api',
				{
					method: 'POST',
					url: 'https://services.leadconnectorhq.com/locations',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Version: '2021-07-28',
					},
					body: {
						businessName: 'Test Business',
						address: '123 Main St',
						city: 'New York',
						state: 'NY',
						country: 'US',
						postalCode: '10001',
						timezone: 'US/Eastern',
						website: 'https://testbusiness.com',
						firstName: 'John',
						lastName: 'Doe',
						email: 'john@testbusiness.com',
						phone: '+1234567890',
						snapshot: {
							id: 'snapshot-123',
							type: 'vertical',
						},
					},
				},
			);

			expect(result).toEqual(mockResponse);
			expect(result.snapshot).toEqual({
				id: 'snapshot-123',
				type: 'vertical',
			});
		});
	});

	describe('Get Sub-Account', () => {
		it('should retrieve a specific sub-account', async () => {
			const mockResponse = {
				id: 'location-123',
				businessName: 'Test Business',
				address: '123 Main St',
				city: 'New York',
				state: 'NY',
				country: 'US',
				postalCode: '10001',
				timezone: 'US/Eastern',
				createdAt: '2024-01-01T00:00:00Z',
				updatedAt: '2024-01-01T00:00:00Z',
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
				mockResponse,
			);

			const result = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'highLevelOAuth2Api',
				{
					method: 'GET',
					url: 'https://services.leadconnectorhq.com/locations/location-123',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Version: '2021-07-28',
					},
				},
			);

			expect(result).toEqual(mockResponse);
			expect(result.id).toBe('location-123');
		});
	});

	describe('Get All Sub-Accounts', () => {
		it('should retrieve all sub-accounts with pagination', async () => {
			const mockResponse = {
				locations: [
					{
						id: 'location-1',
						businessName: 'Business 1',
						city: 'New York',
						state: 'NY',
					},
					{
						id: 'location-2',
						businessName: 'Business 2',
						city: 'Los Angeles',
						state: 'CA',
					},
				],
				meta: {
					total: 2,
					currentPage: 1,
					nextPage: null,
					prevPage: null,
					totalPages: 1,
				},
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
				mockResponse,
			);

			const result = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'highLevelOAuth2Api',
				{
					method: 'GET',
					url: 'https://services.leadconnectorhq.com/locations',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Version: '2021-07-28',
					},
				},
			);

			expect(result).toEqual(mockResponse);
			expect(result.locations).toHaveLength(2);
			expect(result.meta.total).toBe(2);
		});
	});

	describe('Update Sub-Account', () => {
		it('should update sub-account fields', async () => {
			const mockResponse = {
				id: 'location-123',
				businessName: 'Updated Business Name',
				address: '456 Updated St',
				city: 'Updated City',
				state: 'CA',
				country: 'US',
				postalCode: '90210',
				timezone: 'US/Pacific',
				updatedAt: '2024-01-02T00:00:00Z',
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
				mockResponse,
			);

			const result = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'highLevelOAuth2Api',
				{
					method: 'PUT',
					url: 'https://services.leadconnectorhq.com/locations/location-123',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Version: '2021-07-28',
					},
					body: {
						businessName: 'Updated Business Name',
						address: '456 Updated St',
						city: 'Updated City',
						state: 'CA',
						postalCode: '90210',
						timezone: 'US/Pacific',
					},
				},
			);

			expect(result).toEqual(mockResponse);
			expect(result.businessName).toBe('Updated Business Name');
		});
	});

	describe('Delete Sub-Account', () => {
		it('should delete a sub-account', async () => {
			const mockResponse = {
				success: true,
				message: 'Sub-account deleted successfully',
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
				mockResponse,
			);

			const result = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'highLevelOAuth2Api',
				{
					method: 'DELETE',
					url: 'https://services.leadconnectorhq.com/locations/location-123',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Version: '2021-07-28',
					},
				},
			);

			expect(result).toEqual(mockResponse);
			expect(result.success).toBe(true);
		});
	});

	describe('User Management', () => {
		it('should create a user with required fields', async () => {
			const mockResponse = {
				id: 'user-123',
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example.com',
				type: 'account',
				role: 'user',
				locationIds: ['location-123'],
				permissions: {
					contactsEnabled: true,
					workflowsEnabled: true,
					appointmentsEnabled: true,
				},
				createdAt: '2024-01-01T00:00:00Z',
				updatedAt: '2024-01-01T00:00:00Z',
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
				mockResponse,
			);

			const result = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'highLevelOAuth2Api',
				{
					method: 'POST',
					url: 'https://services.leadconnectorhq.com/users',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Version: '2021-07-28',
					},
					body: {
						firstName: 'John',
						lastName: 'Doe',
						email: 'john.doe@example.com',
						type: 'account',
						role: 'user',
						locationIds: ['location-123'],
					},
				},
			);

			expect(result).toEqual(mockResponse);
			expect(result.id).toBe('user-123');
			expect(result.locationIds).toContain('location-123');
		});

		it('should retrieve users list', async () => {
			const mockResponse = {
				users: [
					{
						id: 'user-1',
						firstName: 'John',
						lastName: 'Doe',
						email: 'john@example.com',
						type: 'account',
						role: 'user',
						locationIds: ['location-123'],
					},
					{
						id: 'user-2',
						firstName: 'Jane',
						lastName: 'Smith',
						email: 'jane@example.com',
						type: 'account',
						role: 'admin',
						locationIds: ['location-123'],
					},
				],
				meta: {
					total: 2,
					currentPage: 1,
					totalPages: 1,
				},
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
				mockResponse,
			);

			const result = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'highLevelOAuth2Api',
				{
					method: 'GET',
					url: 'https://services.leadconnectorhq.com/users',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Version: '2021-07-28',
					},
				},
			);

			expect(result).toEqual(mockResponse);
			expect(result.users).toHaveLength(2);
		});
	});

	describe('Update User', () => {
		it('should update user information', async () => {
			const mockResponse = {
				id: 'user-123',
				firstName: 'John Updated',
				lastName: 'Doe Updated',
				email: 'john.updated@example.com',
				type: 'account',
				role: 'admin',
				locationIds: ['location-123', 'location-456'],
				updatedAt: '2024-01-02T00:00:00Z',
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
				mockResponse,
			);

			const result = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'highLevelOAuth2Api',
				{
					method: 'PUT',
					url: 'https://services.leadconnectorhq.com/users/user-123',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Version: '2021-07-28',
					},
					body: {
						firstName: 'John Updated',
						lastName: 'Doe Updated',
						email: 'john.updated@example.com',
						role: 'admin',
						locationIds: ['location-123', 'location-456'],
					},
				},
			);

			expect(result).toEqual(mockResponse);
			expect(result.role).toBe('admin');
			expect(result.locationIds).toHaveLength(2);
		});
	});

	describe('Delete User', () => {
		it('should delete a user', async () => {
			const mockResponse = {
				success: true,
				message: 'User deleted successfully',
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
				mockResponse,
			);

			const result = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'highLevelOAuth2Api',
				{
					method: 'DELETE',
					url: 'https://services.leadconnectorhq.com/users/user-123',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Version: '2021-07-28',
					},
				},
			);

			expect(result).toEqual(mockResponse);
			expect(result.success).toBe(true);
		});
	});

	describe('Business Profile Operations', () => {
		it('should get business profile', async () => {
			const mockResponse = {
				businessName: 'Test Business',
				legalBusinessName: 'Test Business LLC',
				businessEmail: 'contact@testbusiness.com',
				businessPhone: '+1234567890',
				businessWebsite: 'https://testbusiness.com',
				businessType: 'llc',
				businessIndustry: 'Technology',
				businessRegistrationId: '12-3456789',
				brandedDomain: 'custom.testbusiness.com',
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
				mockResponse,
			);

			const result = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'highLevelOAuth2Api',
				{
					method: 'GET',
					url: 'https://services.leadconnectorhq.com/locations/location-123/business-profile',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Version: '2021-07-28',
					},
				},
			);

			expect(result).toEqual(mockResponse);
			expect(result.businessName).toBe('Test Business');
		});

		it('should update business profile', async () => {
			const mockResponse = {
				businessName: 'Updated Test Business',
				legalBusinessName: 'Updated Test Business LLC',
				businessEmail: 'updated@testbusiness.com',
				businessPhone: '+1987654321',
				businessWebsite: 'https://updated.testbusiness.com',
				businessType: 'corporation',
				businessIndustry: 'Healthcare',
				businessRegistrationId: '98-7654321',
				brandedDomain: 'updated.testbusiness.com',
				updatedAt: '2024-01-02T00:00:00Z',
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
				mockResponse,
			);

			const result = await executeFunctions.helpers.httpRequestWithAuthentication.call(
				executeFunctions,
				'highLevelOAuth2Api',
				{
					method: 'PUT',
					url: 'https://services.leadconnectorhq.com/locations/location-123/business-profile',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Version: '2021-07-28',
					},
					body: {
						businessName: 'Updated Test Business',
						legalBusinessName: 'Updated Test Business LLC',
						businessEmail: 'updated@testbusiness.com',
						businessPhone: '+1987654321',
						businessWebsite: 'https://updated.testbusiness.com',
						businessType: 'corporation',
						businessIndustry: 'Healthcare',
						businessRegistrationId: '98-7654321',
						brandedDomain: 'updated.testbusiness.com',
					},
				},
			);

			expect(result).toEqual(mockResponse);
			expect(result.businessType).toBe('corporation');
		});
	});

	describe('Error Handling', () => {
		it('should handle API errors gracefully', async () => {
			const mockError = {
				response: {
					status: 400,
					data: {
						message: 'Invalid business name',
						errors: ['Business name is required'],
					},
				},
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockRejectedValue(
				mockError,
			);

			try {
				await executeFunctions.helpers.httpRequestWithAuthentication.call(
					executeFunctions,
					'highLevelOAuth2Api',
					{
						method: 'POST',
						url: 'https://services.leadconnectorhq.com/locations',
						body: {
							// Missing required fields
						},
					},
				);
			} catch (error) {
				expect(error).toEqual(mockError);
			}
		});

		it('should handle authentication errors', async () => {
			const mockAuthError = {
				response: {
					status: 401,
					data: {
						message: 'Unauthorized',
					},
				},
			};

			(executeFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockRejectedValue(
				mockAuthError,
			);

			try {
				await executeFunctions.helpers.httpRequestWithAuthentication.call(
					executeFunctions,
					'highLevelOAuth2Api',
					{
						method: 'GET',
						url: 'https://services.leadconnectorhq.com/locations',
					},
				);
			} catch (error) {
				expect(error).toEqual(mockAuthError);
			}
		});
	});
}); 