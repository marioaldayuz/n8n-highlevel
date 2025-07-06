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
			},
		],
		default: 'getLocationAccessToken',
	},
];

export const authFields: INodeProperties[] = [
	// Get Location Access Token Fields
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
		displayName: 'Agency Token',
		name: 'agencyToken',
		type: 'string',
		typeOptions: { password: true },
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['auth'],
				operation: ['getLocationAccessToken'],
			},
		},
		description: 'Agency-level access token to exchange for location token',
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
				displayName: 'Scope',
				name: 'scope',
				type: 'multiOptions',
				options: [
					{
						name: 'Contacts',
						value: 'contacts.readonly',
					},
					{
						name: 'Contacts Write',
						value: 'contacts.write',
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
						name: 'Campaigns',
						value: 'campaigns.readonly',
					},
					{
						name: 'Campaigns Write',
						value: 'campaigns.write',
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
						name: 'Forms',
						value: 'forms.readonly',
					},
					{
						name: 'Forms Write',
						value: 'forms.write',
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
						name: 'Locations',
						value: 'locations.readonly',
					},
					{
						name: 'Locations Write',
						value: 'locations.write',
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
						name: 'Conversations',
						value: 'conversations.readonly',
					},
					{
						name: 'Conversations Write',
						value: 'conversations.write',
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
						name: 'Analytics',
						value: 'analytics.readonly',
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
			{
				displayName: 'Include Location Details',
				name: 'includeLocationDetails',
				type: 'boolean',
				default: true,
				description: 'Whether to include detailed location information in the response',
			},
			{
				displayName: 'Include User Details',
				name: 'includeUserDetails',
				type: 'boolean',
				default: false,
				description: 'Whether to include user information associated with the token',
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
				displayName: 'Environment',
				name: 'environment',
				type: 'options',
				options: [
					{
						name: 'Production',
						value: 'production',
					},
					{
						name: 'Sandbox',
						value: 'sandbox',
					},
					{
						name: 'Development',
						value: 'development',
					},
				],
				default: 'production',
				description: 'Environment for the token',
			},
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'string',
				default: '',
				description: 'OAuth client ID (if different from default)',
			},
			{
				displayName: 'Generate Refresh Token',
				name: 'generateRefreshToken',
				type: 'boolean',
				default: false,
				description: 'Whether to generate a refresh token for renewing access',
			},
			{
				displayName: 'Audience',
				name: 'audience',
				type: 'string',
				default: '',
				description: 'Token audience (specific API endpoints or services)',
			},
			{
				displayName: 'Purpose',
				name: 'purpose',
				type: 'string',
				default: '',
				description: 'Purpose or description for this token (for audit logging)',
			},
		],
	},
]; 