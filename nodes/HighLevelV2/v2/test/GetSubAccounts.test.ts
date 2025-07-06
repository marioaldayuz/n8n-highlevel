import type { ILoadOptionsFunctions } from 'n8n-workflow';
import { getSubAccounts } from '../GenericFunctions';

describe('getSubAccounts', () => {
	let loadOptionsFunctions: ILoadOptionsFunctions;

	beforeEach(() => {
		loadOptionsFunctions = {
			getCredentials: jest.fn(),
			helpers: {
				httpRequestWithAuthentication: jest.fn(),
			},
		} as unknown as ILoadOptionsFunctions;
	});

	it('should return formatted sub-account options', async () => {
		const mockCredentials = {
			oauthTokenData: {
				locationId: 'test-location-id',
			},
		};

		const mockSubAccountsResponse = {
			locations: [
				{
					id: 'sub-account-1',
					businessName: 'Test Business 1',
					address: '123 Main St',
					city: 'New York',
					state: 'NY',
					country: 'US',
					postalCode: '10001',
					timezone: 'US/Eastern',
				},
				{
					id: 'sub-account-2',
					businessName: 'Test Business 2',
					address: '456 Oak Ave',
					city: 'Los Angeles',
					state: 'CA',
					country: 'US',
					postalCode: '90210',
					timezone: 'US/Pacific',
				},
				{
					id: 'sub-account-3',
					businessName: 'Test Business 3',
					address: '789 Pine St',
					city: 'Chicago',
					state: 'IL',
					country: 'US',
					postalCode: '60601',
					timezone: 'US/Central',
				},
			],
		};

		(loadOptionsFunctions.getCredentials as jest.Mock).mockResolvedValue(mockCredentials);
		(loadOptionsFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
			mockSubAccountsResponse,
		);

		const result = await getSubAccounts.call(loadOptionsFunctions);

		expect(result).toEqual([
			{
				name: 'Test Business 1 (New York, NY)',
				value: 'sub-account-1',
			},
			{
				name: 'Test Business 2 (Los Angeles, CA)',
				value: 'sub-account-2',
			},
			{
				name: 'Test Business 3 (Chicago, IL)',
				value: 'sub-account-3',
			},
		]);

		expect(loadOptionsFunctions.helpers.httpRequestWithAuthentication).toHaveBeenCalledWith(
			'highLevelOAuth2Api',
			{
				headers: {
					'Content-Type': 'application/json',
					Version: '2021-07-28',
				},
				method: 'GET',
				url: 'https://services.leadconnectorhq.com/locations',
				json: true,
			},
		);
	});

	it('should return empty array when credentials are missing', async () => {
		(loadOptionsFunctions.getCredentials as jest.Mock).mockResolvedValue({});
		(loadOptionsFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue({
			locations: [],
		});

		const result = await getSubAccounts.call(loadOptionsFunctions);

		expect(result).toEqual([]);
	});

	it('should return empty array when API request fails', async () => {
		const mockCredentials = {
			oauthTokenData: {
				locationId: 'test-location-id',
			},
		};

		(loadOptionsFunctions.getCredentials as jest.Mock).mockResolvedValue(mockCredentials);
		(loadOptionsFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockRejectedValue(
			new Error('API request failed'),
		);

		const result = await getSubAccounts.call(loadOptionsFunctions);

		expect(result).toEqual([]);
	});

	it('should handle empty sub-accounts response', async () => {
		const mockCredentials = {
			oauthTokenData: {
				locationId: 'test-location-id',
			},
		};

		const mockEmptyResponse = {
			locations: [],
		};

		(loadOptionsFunctions.getCredentials as jest.Mock).mockResolvedValue(mockCredentials);
		(loadOptionsFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
			mockEmptyResponse,
		);

		const result = await getSubAccounts.call(loadOptionsFunctions);

		expect(result).toEqual([]);
	});

	it('should handle sub-accounts with missing optional fields', async () => {
		const mockCredentials = {
			oauthTokenData: {
				locationId: 'test-location-id',
			},
		};

		const mockSubAccountsResponse = {
			locations: [
				{
					id: 'sub-account-1',
					businessName: 'Test Business 1',
					city: 'New York',
					state: 'NY',
					// Missing address, country, postalCode, timezone
				},
			],
		};

		(loadOptionsFunctions.getCredentials as jest.Mock).mockResolvedValue(mockCredentials);
		(loadOptionsFunctions.helpers.httpRequestWithAuthentication as jest.Mock).mockResolvedValue(
			mockSubAccountsResponse,
		);

		const result = await getSubAccounts.call(loadOptionsFunctions);

		expect(result).toEqual([
			{
				name: 'Test Business 1 (New York, NY)',
				value: 'sub-account-1',
			},
		]);
	});
}); 