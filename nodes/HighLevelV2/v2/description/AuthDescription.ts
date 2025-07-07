import type { INodeProperties } from 'n8n-workflow';

export const authOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['auth'],
			},
		},
		options: [
			{
				name: 'Get Location Access Token',
				value: 'getLocationAccessToken',
				description: 'Get a location-specific access token from agency token',
				action: 'Get location access token',
				routing: {
					request: {
						method: 'POST',
						url: '/oauth/locationToken',
						body: {
							companyId: '={{$parameter["companyId"]}}',
							locationId: '={{$parameter["locationId"]}}',
						},
					},
				},
			},
		],
		default: 'getLocationAccessToken',
	},
];

export const authFields: INodeProperties[] = [
	// Get Location Access Token Fields
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['auth'],
				operation: ['getLocationAccessToken'],
			},
		},
		description: 'ID of the company/agency',
	},
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['auth'],
				operation: ['getLocationAccessToken'],
			},
		},
		description: 'ID of the location to get access token for',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['auth'],
				operation: ['getLocationAccessToken'],
			},
		},
		options: [
			{
				displayName: 'Audience',
				name: 'audience',
				type: 'string',
				default: '',
				description: 'Token audience (specific API endpoints or services)',
			},
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'string',
				default: '',
				description: 'OAuth client ID (if different from default)',
			},
			{
				displayName: 'Environment',
				name: 'environment',
				type: 'options',
				options: [
					{
						name: 'Development',
						value: 'development',
					},
					{
						name: 'Production',
						value: 'production',
					},
					{
						name: 'Sandbox',
						value: 'sandbox',
					},
				],
				default: 'production',
				description: 'Environment for the token',
			},
			{
				displayName: 'Generate Refresh Token',
				name: 'generateRefreshToken',
				type: 'boolean',
				default: false,
				description: 'Whether to generate a refresh token for renewing access',
			},
			{
				displayName: 'Include Location Details',
				name: 'includeLocationDetails',
				type: 'boolean',
				default: true,
				description: 'Whether to include detailed location information in the response',
			},
			{
				displayName: 'Include Permissions',
				name: 'includePermissions',
				type: 'boolean',
				default: true,
				description: 'Whether to include available permissions in the response',
			},
			{
				displayName: 'Include Rate Limits',
				name: 'includeRateLimits',
				type: 'boolean',
				default: false,
				description: 'Whether to include rate limiting information',
			},
			{
				displayName: 'Include Usage Stats',
				name: 'includeUsageStats',
				type: 'boolean',
				default: false,
				description: 'Whether to include API usage statistics',
			},
			{
				displayName: 'Include User Details',
				name: 'includeUserDetails',
				type: 'boolean',
				default: false,
				description: 'Whether to include user information associated with the token',
			},
			{
				displayName: 'Purpose',
				name: 'purpose',
				type: 'string',
				default: '',
				description: 'Purpose or description for this token (for audit logging)',
			},
			{
				displayName: 'Scope',
				name: 'scope',
				type: 'multiOptions',
				options: [
					{
						name: 'Analytics',
						value: 'analytics.readonly',
					},
					{
						name: 'Calendars',
						value: 'calendars.readonly',
					},
					{
						name: 'Calendars Write',
						value: 'calendars.write',
					},
					{
						name: 'Campaigns',
						value: 'campaigns.readonly',
					},
					{
						name: 'Campaigns Write',
						value: 'campaigns.write',
					},
					{
						name: 'Contacts',
						value: 'contacts.readonly',
					},
					{
						name: 'Contacts Write',
						value: 'contacts.write',
					},
					{
						name: 'Conversations',
						value: 'conversations.readonly',
					},
					{
						name: 'Conversations Write',
						value: 'conversations.write',
					},
					{
						name: 'Forms',
						value: 'forms.readonly',
					},
					{
						name: 'Forms Write',
						value: 'forms.write',
					},
					{
						name: 'Locations',
						value: 'locations.readonly',
					},
					{
						name: 'Locations Write',
						value: 'locations.write',
					},
					{
						name: 'Opportunities',
						value: 'opportunities.readonly',
					},
					{
						name: 'Opportunities Write',
						value: 'opportunities.write',
					},
					{
						name: 'Social Planner',
						value: 'social.readonly',
					},
					{
						name: 'Social Planner Write',
						value: 'social.write',
					},
					{
						name: 'Sub-Accounts',
						value: 'sub-accounts.readonly',
					},
					{
						name: 'Sub-Accounts Write',
						value: 'sub-accounts.write',
					},
					{
						name: 'Surveys',
						value: 'surveys.readonly',
					},
					{
						name: 'Surveys Write',
						value: 'surveys.write',
					},
					{
						name: 'Users',
						value: 'users.readonly',
					},
					{
						name: 'Users Write',
						value: 'users.write',
					},
					{
						name: 'Workflows',
						value: 'workflows.readonly',
					},
					{
						name: 'Workflows Write',
						value: 'workflows.write',
					},
				],
				default: [],
				description: 'Requested scopes for the location token',
			},
			{
				displayName: 'Token Expiry Hours',
				name: 'expiryHours',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 8760, // 1 year
				},
				default: 24,
				description: 'Number of hours the token should be valid for',
			},
		],
	},
];
