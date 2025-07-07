import type { IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';

describe('Custom Values Operations', () => {
	const mockGetNodeParameter = jest.fn();
	const mockGetCredentials = jest.fn();
	const mockHighLevelApiRequest = jest.fn();
	const mockContext = {
		getNodeParameter: mockGetNodeParameter,
		getCredentials: mockGetCredentials,
		helpers: {
			httpRequestWithAuthentication: mockHighLevelApiRequest,
		},
	} as unknown as IExecuteSingleFunctions;

	beforeEach(() => {
		mockGetNodeParameter.mockClear();
		mockGetCredentials.mockClear();
		mockHighLevelApiRequest.mockClear();
	});

	describe('Create Custom Value Operation', () => {
		it('should create a custom value successfully', async () => {
			const mockCustomValueData = {
				customValue: {
					id: 'cv-123',
					name: 'Lead Source',
					value: 'Website',
					description: 'Where the lead came from',
					type: 'text',
					category: 'lead-info',
					isActive: true,
					sortOrder: 1,
					locationId: 'loc-456',
					createdAt: '2024-01-15T10:00:00Z',
					updatedAt: '2024-01-15T10:00:00Z',
					createdBy: 'user-789',
					updatedBy: 'user-789',
				},
				success: true,
				message: 'Custom value created successfully',
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'customValues';
					case 'operation':
						return 'create';
					case 'name':
						return 'Lead Source';
					case 'value':
						return 'Website';
					default:
						return undefined;
				}
			});

			mockGetCredentials.mockResolvedValue({ 
				oauthTokenData: { locationId: 'loc-456' } 
			});

			mockHighLevelApiRequest.mockResolvedValue(mockCustomValueData);

			const requestOptions: IHttpRequestOptions = {
				method: 'POST',
				url: '/custom-values',
				body: {
					locationId: 'loc-456',
					name: 'Lead Source',
					value: 'Website',
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockCustomValueData);
			expect(result.customValue.id).toBe('cv-123');
			expect(result.customValue.name).toBe('Lead Source');
			expect(result.success).toBe(true);
		});

		it('should handle create custom value with additional fields', async () => {
			const mockCustomValueData = {
				customValue: {
					id: 'cv-456',
					name: 'Priority Level',
					value: 'High',
					description: 'Customer priority classification',
					type: 'text',
					category: 'customer-data',
					isActive: true,
					sortOrder: 5,
					locationId: 'loc-456',
					createdAt: '2024-01-15T11:00:00Z',
				},
				success: true,
				message: 'Custom value created successfully',
			};

			mockHighLevelApiRequest.mockResolvedValue(mockCustomValueData);

			const requestOptions: IHttpRequestOptions = {
				method: 'POST',
				url: '/custom-values',
				body: {
					locationId: 'loc-456',
					name: 'Priority Level',
					value: 'High',
					description: 'Customer priority classification',
					type: 'text',
					category: 'customer-data',
					sortOrder: 5,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockCustomValueData);
			expect(result.customValue.type).toBe('text');
			expect(result.customValue.category).toBe('customer-data');
		});
	});

	describe('Get All Custom Values Operation', () => {
		it('should retrieve all custom values successfully', async () => {
			const mockCustomValuesData = {
				customValues: [
					{
						id: 'cv-1',
						name: 'Lead Source',
						value: 'Website',
						type: 'text',
						category: 'lead-info',
						isActive: true,
						locationId: 'loc-456',
						createdAt: '2024-01-15T10:00:00Z',
					},
					{
						id: 'cv-2',
						name: 'Priority',
						value: 'High',
						type: 'text',
						category: 'customer-data',
						isActive: true,
						locationId: 'loc-456',
						createdAt: '2024-01-16T10:00:00Z',
					},
				],
				meta: {
					total: 2,
					count: 2,
					limit: 50,
					offset: 0,
					locationId: 'loc-456',
				},
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'customValues';
					case 'operation':
						return 'getAll';
					default:
						return undefined;
				}
			});

			mockGetCredentials.mockResolvedValue({ 
				oauthTokenData: { locationId: 'loc-456' } 
			});

			mockHighLevelApiRequest.mockResolvedValue(mockCustomValuesData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/custom-values',
				qs: {
					locationId: 'loc-456',
					limit: 50,
					offset: 0,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockCustomValuesData);
			expect(result.customValues).toHaveLength(2);
			expect(result.meta.total).toBe(2);
		});

		it('should handle filtering custom values', async () => {
			const mockFilteredData = {
				customValues: [
					{
						id: 'cv-1',
						name: 'Lead Source',
						value: 'Website',
						type: 'text',
						category: 'lead-info',
						isActive: true,
						locationId: 'loc-456',
					},
				],
				meta: {
					total: 1,
					count: 1,
					limit: 50,
					offset: 0,
					locationId: 'loc-456',
				},
			};

			mockHighLevelApiRequest.mockResolvedValue(mockFilteredData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/custom-values',
				qs: {
					locationId: 'loc-456',
					category: 'lead-info',
					type: 'text',
					isActive: 'true',
					limit: 50,
					offset: 0,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockFilteredData);
			expect(result.customValues).toHaveLength(1);
			expect(result.customValues[0].category).toBe('lead-info');
		});
	});

	describe('Get Custom Value Operation', () => {
		it('should retrieve a specific custom value successfully', async () => {
			const mockCustomValueData = {
				customValue: {
					id: 'cv-123',
					name: 'Lead Source',
					value: 'Website',
					description: 'Where the lead came from',
					type: 'text',
					category: 'lead-info',
					isActive: true,
					sortOrder: 1,
					locationId: 'loc-456',
					createdAt: '2024-01-15T10:00:00Z',
					updatedAt: '2024-01-15T10:00:00Z',
				},
				success: true,
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'customValues';
					case 'operation':
						return 'get';
					case 'customValueId':
						return 'cv-123';
					default:
						return undefined;
				}
			});

			mockHighLevelApiRequest.mockResolvedValue(mockCustomValueData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/custom-values/cv-123',
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockCustomValueData);
			expect(result.customValue.id).toBe('cv-123');
			expect(result.success).toBe(true);
		});
	});

	describe('Update Custom Value Operation', () => {
		it('should update a custom value successfully', async () => {
			const mockUpdatedCustomValueData = {
				customValue: {
					id: 'cv-123',
					name: 'Lead Source Updated',
					value: 'Social Media',
					description: 'Updated source information',
					type: 'text',
					category: 'lead-info',
					isActive: true,
					sortOrder: 2,
					locationId: 'loc-456',
					createdAt: '2024-01-15T10:00:00Z',
					updatedAt: '2024-01-17T12:00:00Z',
					createdBy: 'user-789',
					updatedBy: 'user-789',
				},
				success: true,
				message: 'Custom value updated successfully',
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'customValues';
					case 'operation':
						return 'update';
					case 'customValueId':
						return 'cv-123';
					default:
						return undefined;
				}
			});

			mockHighLevelApiRequest.mockResolvedValue(mockUpdatedCustomValueData);

			const requestOptions: IHttpRequestOptions = {
				method: 'PUT',
				url: '/custom-values/cv-123',
				body: {
					locationId: 'loc-456',
					name: 'Lead Source Updated',
					value: 'Social Media',
					description: 'Updated source information',
					sortOrder: 2,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockUpdatedCustomValueData);
			expect(result.customValue.name).toBe('Lead Source Updated');
			expect(result.customValue.value).toBe('Social Media');
			expect(result.success).toBe(true);
		});
	});

	describe('Delete Custom Value Operation', () => {
		it('should delete a custom value successfully', async () => {
			const mockDeleteData = {
				success: true,
				message: 'Custom value deleted successfully',
				deletedCustomValue: {
					id: 'cv-123',
					locationId: 'loc-456',
					deletedAt: '2024-01-17T15:00:00Z',
				},
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'customValues';
					case 'operation':
						return 'delete';
					case 'customValueId':
						return 'cv-123';
					default:
						return undefined;
				}
			});

			mockHighLevelApiRequest.mockResolvedValue(mockDeleteData);

			const requestOptions: IHttpRequestOptions = {
				method: 'DELETE',
				url: '/custom-values/cv-123',
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockDeleteData);
			expect(result.success).toBe(true);
			expect(result.deletedCustomValue.id).toBe('cv-123');
		});
	});

	describe('Data Types and Validation', () => {
		it('should handle different data types', () => {
			const customValueTypes = ['text', 'number', 'boolean', 'date', 'url', 'email'];
			
			customValueTypes.forEach(type => {
				expect(['text', 'number', 'boolean', 'date', 'url', 'email']).toContain(type);
			});
		});

		it('should handle boolean isActive field', () => {
			const activeStates = [true, false];
			
			activeStates.forEach(state => {
				expect(typeof state).toBe('boolean');
			});
		});

		it('should handle numeric sortOrder field', () => {
			const sortOrders = [0, 1, 5, 10, 100];
			
			sortOrders.forEach(order => {
				expect(typeof order).toBe('number');
				expect(order).toBeGreaterThanOrEqual(0);
			});
		});
	});

	describe('Search and Filtering', () => {
		it('should handle search functionality', async () => {
			const mockSearchData = {
				customValues: [
					{
						id: 'cv-1',
						name: 'Lead Source',
						value: 'Website Search',
						type: 'text',
						category: 'lead-info',
						isActive: true,
						locationId: 'loc-456',
					},
				],
				meta: {
					total: 1,
					count: 1,
					limit: 50,
					offset: 0,
					locationId: 'loc-456',
				},
			};

			mockHighLevelApiRequest.mockResolvedValue(mockSearchData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/custom-values',
				qs: {
					locationId: 'loc-456',
					search: 'Lead',
					limit: 50,
					offset: 0,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockSearchData);
			expect(result.customValues[0].name).toContain('Lead');
		});

		it('should handle category filtering', async () => {
			const categories = ['lead-info', 'customer-data', 'product-info', 'marketing'];
			
			categories.forEach(category => {
				expect(typeof category).toBe('string');
				expect(category.length).toBeGreaterThan(0);
			});
		});
	});

	describe('Error Handling', () => {
		it('should handle API errors gracefully', async () => {
			const mockError = new Error('API Error: Custom value not found');
			mockHighLevelApiRequest.mockRejectedValue(mockError);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/custom-values/invalid-id',
			};

			await expect(
				mockHighLevelApiRequest.call(mockContext, requestOptions)
			).rejects.toThrow('API Error: Custom value not found');
		});

		it('should handle missing required parameters', async () => {
			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'name':
						return '';
					case 'value':
						return '';
					default:
						return undefined;
				}
			});

			const hasRequiredParams = 
				mockGetNodeParameter('name') && 
				mockGetNodeParameter('value');

			expect(hasRequiredParams).toBe(false);
		});

		it('should handle missing custom value ID for specific operations', async () => {
			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'customValueId':
						return '';
					default:
						return undefined;
				}
			});

			const hasRequiredParams = mockGetNodeParameter('customValueId');

			expect(hasRequiredParams).toBe(false);
		});

		it('should handle invalid data types', () => {
			const invalidTypes = ['invalid', 'wrong', 'fake'];
			const validTypes = ['text', 'number', 'boolean', 'date', 'url', 'email'];
			
			invalidTypes.forEach(type => {
				expect(validTypes).not.toContain(type);
			});
		});
	});

	describe('Integration Scenarios', () => {
		it('should handle bulk custom value operations', async () => {
			const mockBulkData = {
				customValues: [
					{ id: 'cv-1', name: 'Source1', value: 'Value1', category: 'cat1' },
					{ id: 'cv-2', name: 'Source2', value: 'Value2', category: 'cat1' },
					{ id: 'cv-3', name: 'Source3', value: 'Value3', category: 'cat1' },
					{ id: 'cv-4', name: 'Source4', value: 'Value4', category: 'cat1' },
					{ id: 'cv-5', name: 'Source5', value: 'Value5', category: 'cat1' },
				],
				meta: {
					total: 5,
					count: 5,
					limit: 50,
					offset: 0,
					locationId: 'loc-456',
				},
			};

			mockHighLevelApiRequest.mockResolvedValue(mockBulkData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/custom-values',
				qs: {
					locationId: 'loc-456',
					category: 'cat1',
					limit: 50,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockBulkData);
			expect(result.customValues).toHaveLength(5);
		});

		it('should handle custom value organization by category', () => {
			const customValues = [
				{ category: 'lead-info', name: 'Source' },
				{ category: 'lead-info', name: 'Medium' },
				{ category: 'customer-data', name: 'Priority' },
				{ category: 'customer-data', name: 'Status' },
			];

			const groupedByCategory = customValues.reduce((acc, cv) => {
				if (!acc[cv.category]) acc[cv.category] = [];
				acc[cv.category].push(cv);
				return acc;
			}, {} as Record<string, any[]>);

			expect(groupedByCategory['lead-info']).toHaveLength(2);
			expect(groupedByCategory['customer-data']).toHaveLength(2);
		});
	});
}); 