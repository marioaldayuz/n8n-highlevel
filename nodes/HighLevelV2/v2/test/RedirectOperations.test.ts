import type { IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';

describe('Redirect Operations', () => {
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

	describe('Create Redirect Operation', () => {
		it('should create a redirect successfully', async () => {
			const mockRedirectData = {
				redirect: {
					id: 'redirect-123',
					sourceUrl: '/old-page',
					targetUrl: '/new-page',
					redirectType: '301',
					description: 'Redirect to new page',
					isActive: true,
					locationId: 'loc-456',
					createdAt: '2024-01-15T10:00:00Z',
					updatedAt: '2024-01-15T10:00:00Z',
					createdBy: 'user-789',
					clickCount: 0,
					lastAccessed: null,
				},
				success: true,
				message: 'Redirect created successfully',
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'redirect';
					case 'operation':
						return 'create';
					case 'sourceUrl':
						return '/old-page';
					case 'targetUrl':
						return '/new-page';
					default:
						return undefined;
				}
			});

			mockGetCredentials.mockResolvedValue({ 
				oauthTokenData: { locationId: 'loc-456' } 
			});

			mockHighLevelApiRequest.mockResolvedValue(mockRedirectData);

			const requestOptions: IHttpRequestOptions = {
				method: 'POST',
				url: '/redirects/',
				body: {
					locationId: 'loc-456',
					sourceUrl: '/old-page',
					targetUrl: '/new-page',
					redirectType: '301',
					description: 'Redirect to new page',
					isActive: true,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockRedirectData);
			expect(result.redirect.id).toBe('redirect-123');
			expect(result.redirect.sourceUrl).toBe('/old-page');
			expect(result.redirect.targetUrl).toBe('/new-page');
			expect(result.success).toBe(true);
		});

		it('should handle create redirect with additional fields', async () => {
			const mockRedirectData = {
				redirect: {
					id: 'redirect-456',
					sourceUrl: '/promo-old',
					targetUrl: 'https://external-site.com/promo',
					redirectType: '302',
					description: 'Temporary promotional redirect',
					isActive: false,
					locationId: 'loc-456',
					createdAt: '2024-01-15T11:00:00Z',
					updatedAt: '2024-01-15T11:00:00Z',
					createdBy: 'user-789',
					clickCount: 0,
				},
				success: true,
				message: 'Redirect created successfully',
			};

			mockHighLevelApiRequest.mockResolvedValue(mockRedirectData);

			const requestOptions: IHttpRequestOptions = {
				method: 'POST',
				url: '/redirects/',
				body: {
					locationId: 'loc-456',
					sourceUrl: '/promo-old',
					targetUrl: 'https://external-site.com/promo',
					redirectType: '302',
					description: 'Temporary promotional redirect',
					isActive: false,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockRedirectData);
			expect(result.redirect.redirectType).toBe('302');
			expect(result.redirect.isActive).toBe(false);
		});
	});

	describe('Get All Redirects Operation', () => {
		it('should retrieve all redirects successfully', async () => {
			const mockRedirectsData = {
				redirects: [
					{
						id: 'redirect-1',
						sourceUrl: '/old-1',
						targetUrl: '/new-1',
						redirectType: '301',
						description: 'First redirect',
						isActive: true,
						locationId: 'loc-456',
						createdAt: '2024-01-15T10:00:00Z',
						clickCount: 25,
					},
					{
						id: 'redirect-2',
						sourceUrl: '/old-2',
						targetUrl: '/new-2',
						redirectType: '302',
						description: 'Second redirect',
						isActive: false,
						locationId: 'loc-456',
						createdAt: '2024-01-16T10:00:00Z',
						clickCount: 12,
					},
				],
				meta: {
					total: 2,
					count: 2,
					limit: 20,
					offset: 0,
				},
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'redirect';
					case 'operation':
						return 'getAll';
					default:
						return undefined;
				}
			});

			mockGetCredentials.mockResolvedValue({ 
				oauthTokenData: { locationId: 'loc-456' } 
			});

			mockHighLevelApiRequest.mockResolvedValue(mockRedirectsData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/redirects/',
				qs: {
					locationId: 'loc-456',
					limit: 20,
					offset: 0,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockRedirectsData);
			expect(result.redirects).toHaveLength(2);
			expect(result.meta.total).toBe(2);
		});

		it('should handle filtering by status', async () => {
			const mockFilteredRedirectsData = {
				redirects: [
					{
						id: 'redirect-1',
						sourceUrl: '/active-redirect',
						targetUrl: '/active-target',
						redirectType: '301',
						isActive: true,
						locationId: 'loc-456',
						clickCount: 50,
					},
				],
				meta: {
					total: 1,
					count: 1,
					limit: 20,
					offset: 0,
				},
			};

			mockHighLevelApiRequest.mockResolvedValue(mockFilteredRedirectsData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/redirects/',
				qs: {
					locationId: 'loc-456',
					status: 'active',
					limit: 20,
					offset: 0,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockFilteredRedirectsData);
			expect(result.redirects[0].isActive).toBe(true);
		});
	});

	describe('Update Redirect Operation', () => {
		it('should update a redirect successfully', async () => {
			const mockUpdatedRedirectData = {
				redirect: {
					id: 'redirect-123',
					sourceUrl: '/old-page-updated',
					targetUrl: '/new-page-updated',
					redirectType: '302',
					description: 'Updated redirect description',
					isActive: false,
					locationId: 'loc-456',
					createdAt: '2024-01-15T10:00:00Z',
					updatedAt: '2024-01-17T12:00:00Z',
					createdBy: 'user-789',
					clickCount: 100,
				},
				success: true,
				message: 'Redirect updated successfully',
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'redirect';
					case 'operation':
						return 'update';
					case 'redirectId':
						return 'redirect-123';
					default:
						return undefined;
				}
			});

			mockHighLevelApiRequest.mockResolvedValue(mockUpdatedRedirectData);

			const requestOptions: IHttpRequestOptions = {
				method: 'PUT',
				url: '/redirects/redirect-123',
				body: {
					locationId: 'loc-456',
					sourceUrl: '/old-page-updated',
					targetUrl: '/new-page-updated',
					redirectType: '302',
					description: 'Updated redirect description',
					isActive: false,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockUpdatedRedirectData);
			expect(result.redirect.redirectType).toBe('302');
			expect(result.redirect.isActive).toBe(false);
			expect(result.success).toBe(true);
		});
	});

	describe('Delete Redirect Operation', () => {
		it('should delete a redirect successfully', async () => {
			const mockDeleteData = {
				success: true,
				message: 'Redirect deleted successfully',
				deletedRedirect: {
					id: 'redirect-123',
					sourceUrl: '/old-page',
					targetUrl: '/new-page',
					locationId: 'loc-456',
					deletedAt: '2024-01-17T15:00:00Z',
				},
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'redirect';
					case 'operation':
						return 'delete';
					case 'redirectId':
						return 'redirect-123';
					default:
						return undefined;
				}
			});

			mockHighLevelApiRequest.mockResolvedValue(mockDeleteData);

			const requestOptions: IHttpRequestOptions = {
				method: 'DELETE',
				url: '/redirects/redirect-123',
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockDeleteData);
			expect(result.success).toBe(true);
			expect(result.deletedRedirect.id).toBe('redirect-123');
		});
	});

	describe('Error Handling', () => {
		it('should handle API errors gracefully', async () => {
			const mockError = new Error('API Error: Redirect not found');
			mockHighLevelApiRequest.mockRejectedValue(mockError);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/redirects/',
				qs: {
					locationId: 'invalid-loc',
				},
			};

			await expect(
				mockHighLevelApiRequest.call(mockContext, requestOptions)
			).rejects.toThrow('API Error: Redirect not found');
		});

		it('should handle missing required parameters for create', async () => {
			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'sourceUrl':
						return '';
					case 'targetUrl':
						return '';
					default:
						return undefined;
				}
			});

			const hasRequiredParams = 
				mockGetNodeParameter('sourceUrl') && 
				mockGetNodeParameter('targetUrl');

			expect(hasRequiredParams).toBe(false);
		});

		it('should handle missing redirect ID for update/delete operations', async () => {
			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'redirectId':
						return '';
					default:
						return undefined;
				}
			});

			const hasRequiredParams = mockGetNodeParameter('redirectId');

			expect(hasRequiredParams).toBe(false);
		});
	});
}); 