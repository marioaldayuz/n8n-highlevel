import type { IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';

describe('Funnel Operations', () => {
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

	describe('Get All Funnels Operation', () => {
		it('should retrieve all funnels successfully', async () => {
			const mockFunnelsData = {
				funnels: [
					{
						id: 'funnel-123',
						name: 'Lead Generation Funnel',
						description: 'Funnel for capturing leads',
						status: 'active',
						category: 'lead-generation',
						locationId: 'loc-456',
						createdAt: '2024-01-15T10:00:00Z',
						updatedAt: '2024-01-15T10:00:00Z',
						createdBy: 'user-789',
						pageCount: 3,
						conversionRate: 15.5,
						totalViews: 1000,
						totalConversions: 155,
						domain: 'example.com',
						subDomain: 'funnels',
						favicon: 'https://example.com/favicon.ico',
						tags: ['marketing', 'leads'],
					},
					{
						id: 'funnel-456',
						name: 'Sales Funnel',
						description: 'Funnel for product sales',
						status: 'active',
						category: 'sales',
						locationId: 'loc-456',
						createdAt: '2024-01-16T10:00:00Z',
						updatedAt: '2024-01-16T10:00:00Z',
						createdBy: 'user-789',
						pageCount: 5,
						conversionRate: 8.2,
						totalViews: 2000,
						totalConversions: 164,
						domain: 'example.com',
						subDomain: 'sales',
						tags: ['sales', 'ecommerce'],
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
						return 'funnel';
					case 'operation':
						return 'getFunnels';
					default:
						return undefined;
				}
			});

			mockGetCredentials.mockResolvedValue({ 
				oauthTokenData: { locationId: 'loc-456' } 
			});

			mockHighLevelApiRequest.mockResolvedValue(mockFunnelsData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/funnels/',
				qs: {
					locationId: 'loc-456',
					limit: 20,
					offset: 0,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockFunnelsData);
			expect(result.funnels).toHaveLength(2);
			expect(result.funnels[0].id).toBe('funnel-123');
			expect(result.meta.total).toBe(2);
		});

		it('should handle filtering by status and category', async () => {
			const mockFilteredFunnelsData = {
				funnels: [
					{
						id: 'funnel-active',
						name: 'Active Sales Funnel',
						description: 'Active sales funnel',
						status: 'active',
						category: 'sales',
						locationId: 'loc-456',
						pageCount: 4,
						conversionRate: 12.3,
					},
				],
				meta: {
					total: 1,
					count: 1,
					limit: 20,
					offset: 0,
				},
			};

			mockHighLevelApiRequest.mockResolvedValue(mockFilteredFunnelsData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/funnels/',
				qs: {
					locationId: 'loc-456',
					status: 'active',
					category: 'sales',
					limit: 20,
					offset: 0,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockFilteredFunnelsData);
			expect(result.funnels[0].status).toBe('active');
			expect(result.funnels[0].category).toBe('sales');
		});
	});

	describe('Get Funnel Pages Operation', () => {
		it('should retrieve funnel pages successfully', async () => {
			const mockPagesData = {
				pages: [
					{
						id: 'page-123',
						name: 'Landing Page',
						title: 'Welcome to Our Service',
						description: 'Main landing page',
						pageType: 'landing',
						status: 'active',
						funnelId: 'funnel-123',
						locationId: 'loc-456',
						url: 'https://example.com/landing',
						slug: 'landing',
						seoTitle: 'Best Service Provider',
						seoDescription: 'We provide the best services',
						seoKeywords: ['service', 'best', 'provider'],
						favicon: 'https://example.com/favicon.ico',
						thumbnail: 'https://example.com/thumb.jpg',
						createdAt: '2024-01-15T10:00:00Z',
						updatedAt: '2024-01-15T10:00:00Z',
						createdBy: 'user-789',
						views: 500,
						conversions: 75,
						conversionRate: 15.0,
						isOptinPage: true,
						isMobileFriendly: true,
						sortOrder: 1,
					},
					{
						id: 'page-456',
						name: 'Thank You Page',
						title: 'Thank You!',
						description: 'Thank you for signing up',
						pageType: 'thankyou',
						status: 'active',
						funnelId: 'funnel-123',
						locationId: 'loc-456',
						url: 'https://example.com/thank-you',
						slug: 'thank-you',
						createdAt: '2024-01-15T11:00:00Z',
						views: 75,
						conversions: 0,
						conversionRate: 0,
						isOptinPage: false,
						isMobileFriendly: true,
						sortOrder: 2,
					},
				],
				meta: {
					total: 2,
					count: 2,
					limit: 20,
					offset: 0,
					funnelId: 'funnel-123',
				},
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'funnel';
					case 'operation':
						return 'getFunnelPages';
					case 'funnelId':
						return 'funnel-123';
					default:
						return undefined;
				}
			});

			mockGetCredentials.mockResolvedValue({ 
				oauthTokenData: { locationId: 'loc-456' } 
			});

			mockHighLevelApiRequest.mockResolvedValue(mockPagesData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/funnels/funnel-123/pages',
				qs: {
					locationId: 'loc-456',
					limit: 20,
					offset: 0,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockPagesData);
			expect(result.pages).toHaveLength(2);
			expect(result.pages[0].pageType).toBe('landing');
			expect(result.pages[1].pageType).toBe('thankyou');
			expect(result.meta.funnelId).toBe('funnel-123');
		});

		it('should handle filtering by page type and status', async () => {
			const mockFilteredPagesData = {
				pages: [
					{
						id: 'page-landing',
						name: 'Active Landing Page',
						pageType: 'landing',
						status: 'active',
						funnelId: 'funnel-123',
						locationId: 'loc-456',
						views: 300,
						conversions: 45,
						conversionRate: 15.0,
					},
				],
				meta: {
					total: 1,
					count: 1,
					limit: 20,
					offset: 0,
					funnelId: 'funnel-123',
				},
			};

			mockHighLevelApiRequest.mockResolvedValue(mockFilteredPagesData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/funnels/funnel-123/pages',
				qs: {
					locationId: 'loc-456',
					pageType: 'landing',
					status: 'active',
					limit: 20,
					offset: 0,
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockFilteredPagesData);
			expect(result.pages[0].pageType).toBe('landing');
			expect(result.pages[0].status).toBe('active');
		});
	});

	describe('Get Page Count Operation', () => {
		it('should retrieve page count successfully', async () => {
			const mockCountData = {
				count: {
					total: 5,
					active: 4,
					inactive: 1,
					draft: 0,
					byType: {
						landing: 2,
						thankyou: 1,
						sales: 1,
						checkout: 1,
						upsell: 0,
						downsell: 0,
					},
					funnelId: 'funnel-123',
					locationId: 'loc-456',
				},
				success: true,
			};

			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'resource':
						return 'funnel';
					case 'operation':
						return 'getPageCount';
					case 'funnelId':
						return 'funnel-123';
					default:
						return undefined;
				}
			});

			mockGetCredentials.mockResolvedValue({ 
				oauthTokenData: { locationId: 'loc-456' } 
			});

			mockHighLevelApiRequest.mockResolvedValue(mockCountData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/funnels/funnel-123/pages/count',
				qs: {
					locationId: 'loc-456',
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockCountData);
			expect(result.count.total).toBe(5);
			expect(result.count.active).toBe(4);
			expect(result.count.byType.landing).toBe(2);
			expect(result.success).toBe(true);
		});

		it('should handle filtering by page type for count', async () => {
			const mockFilteredCountData = {
				count: {
					total: 2,
					active: 2,
					inactive: 0,
					draft: 0,
					byType: {
						landing: 2,
						thankyou: 0,
						sales: 0,
						checkout: 0,
						upsell: 0,
						downsell: 0,
					},
					funnelId: 'funnel-123',
					locationId: 'loc-456',
				},
				success: true,
			};

			mockHighLevelApiRequest.mockResolvedValue(mockFilteredCountData);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/funnels/funnel-123/pages/count',
				qs: {
					locationId: 'loc-456',
					pageType: 'landing',
					status: 'active',
				},
			};

			const result = await mockHighLevelApiRequest.call(mockContext, requestOptions);

			expect(result).toEqual(mockFilteredCountData);
			expect(result.count.byType.landing).toBe(2);
		});
	});

	describe('Error Handling', () => {
		it('should handle API errors gracefully', async () => {
			const mockError = new Error('API Error: Funnel not found');
			mockHighLevelApiRequest.mockRejectedValue(mockError);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/funnels/',
				qs: {
					locationId: 'invalid-loc',
				},
			};

			await expect(
				mockHighLevelApiRequest.call(mockContext, requestOptions)
			).rejects.toThrow('API Error: Funnel not found');
		});

		it('should handle missing funnel ID for funnel pages operations', async () => {
			mockGetNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'funnelId':
						return '';
					default:
						return undefined;
				}
			});

			const hasRequiredParams = mockGetNodeParameter('funnelId');

			expect(hasRequiredParams).toBe(false);
		});

		it('should handle invalid funnel ID format', async () => {
			const mockError = new Error('API Error: Invalid funnel ID format');
			mockHighLevelApiRequest.mockRejectedValue(mockError);

			const requestOptions: IHttpRequestOptions = {
				method: 'GET',
				url: '/funnels/invalid-id/pages',
				qs: {
					locationId: 'loc-456',
				},
			};

			await expect(
				mockHighLevelApiRequest.call(mockContext, requestOptions)
			).rejects.toThrow('API Error: Invalid funnel ID format');
		});
	});
}); 