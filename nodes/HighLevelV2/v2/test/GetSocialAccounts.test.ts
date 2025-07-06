import type { ILoadOptionsFunctions } from 'n8n-workflow';

import { getSocialAccounts } from '../GenericFunctions';

describe('getSocialAccounts', () => {
	const mockHighLevelApiRequest = jest.fn();
	const mockGetCredentials = jest.fn();
	const mockContext = {
		getCredentials: mockGetCredentials,
		helpers: {
			httpRequestWithAuthentication: mockHighLevelApiRequest,
		},
	} as unknown as ILoadOptionsFunctions;

	beforeEach(() => {
		mockHighLevelApiRequest.mockClear();
		mockGetCredentials.mockClear();
	});

	it('should return a list of connected social accounts', async () => {
		const mockSocialAccounts = [
			{ 
				id: '1', 
				accountName: 'My Facebook Page', 
				platform: 'facebook',
				status: 'connected'
			},
			{ 
				id: '2', 
				accountName: 'My Instagram Business', 
				platform: 'instagram',
				status: 'connected'
			},
			{ 
				id: '3', 
				accountName: 'Old LinkedIn Account', 
				platform: 'linkedin',
				status: 'disconnected'
			},
		];

		mockHighLevelApiRequest.mockResolvedValue({ socialAccounts: mockSocialAccounts });
		mockGetCredentials.mockResolvedValue({ oauthTokenData: { locationId: '123' } });

		const response = await getSocialAccounts.call(mockContext);

		expect(response).toEqual([
			{ name: 'My Facebook Page (Facebook)', value: '1' },
			{ name: 'My Instagram Business (Instagram)', value: '2' },
		]);
		
		expect(mockHighLevelApiRequest).toHaveBeenCalledWith(
			'GET',
			'/locations/123/social-planner/accounts',
			undefined,
			{}
		);
	});

	it('should filter out disconnected accounts', async () => {
		const mockSocialAccounts = [
			{ 
				id: '1', 
				accountName: 'Connected Account', 
				platform: 'facebook',
				status: 'connected'
			},
			{ 
				id: '2', 
				accountName: 'Disconnected Account', 
				platform: 'instagram',
				status: 'disconnected'
			},
			{ 
				id: '3', 
				accountName: 'Expired Account', 
				platform: 'linkedin',
				status: 'expired'
			},
		];

		mockHighLevelApiRequest.mockResolvedValue({ socialAccounts: mockSocialAccounts });
		mockGetCredentials.mockResolvedValue({ oauthTokenData: { locationId: '123' } });

		const response = await getSocialAccounts.call(mockContext);

		expect(response).toEqual([
			{ name: 'Connected Account (Facebook)', value: '1' },
		]);
	});

	it('should handle empty social accounts list', async () => {
		mockHighLevelApiRequest.mockResolvedValue({ socialAccounts: [] });
		mockGetCredentials.mockResolvedValue({ oauthTokenData: { locationId: '123' } });

		const response = await getSocialAccounts.call(mockContext);

		expect(response).toEqual([]);
	});

	it('should return empty array when API call fails', async () => {
		mockHighLevelApiRequest.mockRejectedValue(new Error('API Error'));
		mockGetCredentials.mockResolvedValue({ oauthTokenData: { locationId: '123' } });

		const response = await getSocialAccounts.call(mockContext);

		expect(response).toEqual([]);
	});

	it('should handle missing locationId gracefully', async () => {
		mockGetCredentials.mockResolvedValue({ oauthTokenData: {} });

		const response = await getSocialAccounts.call(mockContext);

		expect(response).toEqual([]);
	});
}); 