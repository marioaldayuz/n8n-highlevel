import type { INodeProperties } from 'n8n-workflow';

export const subAccountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['subAccount'],
			},
		},
		options: [
			{
				name: 'Create Sub-Account',
				value: 'createSubAccount',
				action: 'Create a new sub account location',
				routing: {
					request: {
						method: 'POST',
						url: '=/locations',
					},
				},
			},
			{
				name: 'Get Sub-Account',
				value: 'getSubAccount',
				action: 'Get a sub account by id',
				routing: {
					request: {
						method: 'GET',
						url: '=/locations/{{$parameter.locationId}}',
					},
				},
			},
			{
				name: 'Get All Sub-Accounts',
				value: 'getAllSubAccounts',
				action: 'Get all sub accounts',
				routing: {
					request: {
						method: 'GET',
						url: '=/locations',
					},
				},
			},
			{
				name: 'Update Sub-Account',
				value: 'updateSubAccount',
				action: 'Update a sub account',
				routing: {
					request: {
						method: 'PUT',
						url: '=/locations/{{$parameter.locationId}}',
					},
				},
			},
			{
				name: 'Delete Sub-Account',
				value: 'deleteSubAccount',
				action: 'Delete a sub account',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/locations/{{$parameter.locationId}}',
					},
				},
			},
			{
				name: 'Create User',
				value: 'createUser',
				action: 'Create a user in sub account',
				routing: {
					request: {
						method: 'POST',
						url: '=/users',
					},
				},
			},
			{
				name: 'Get Users',
				value: 'getUsers',
				action: 'Get users in sub account',
				routing: {
					request: {
						method: 'GET',
						url: '=/users',
					},
				},
			},
			{
				name: 'Update User',
				value: 'updateUser',
				action: 'Update a user',
				routing: {
					request: {
						method: 'PUT',
						url: '=/users/{{$parameter.userId}}',
					},
				},
			},
			{
				name: 'Delete User',
				value: 'deleteUser',
				action: 'Delete a user',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/users/{{$parameter.userId}}',
					},
				},
			},
			{
				name: 'Get Business Profile',
				value: 'getBusinessProfile',
				action: 'Get business profile information',
				routing: {
					request: {
						method: 'GET',
						url: '=/locations/{{$parameter.locationId}}/business-profile',
					},
				},
			},
			{
				name: 'Update Business Profile',
				value: 'updateBusinessProfile',
				action: 'Update business profile information',
				routing: {
					request: {
						method: 'PUT',
						url: '=/locations/{{$parameter.locationId}}/business-profile',
					},
				},
			},
		],
		default: 'createSubAccount',
		noDataExpression: true,
	},
];

export const subAccountFields: INodeProperties[] = [
	// Create Sub-Account Fields
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		description: 'The agency company ID',
		routing: {
			send: {
				type: 'body',
				property: 'companyId',
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		description: 'The name of the sub-account',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Phone',
		name: 'phone',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		description: 'Business phone number',
		routing: {
			send: {
				type: 'body',
				property: 'phone',
			},
		},
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		description: 'Business address',
		routing: {
			send: {
				type: 'body',
				property: 'address',
			},
		},
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		description: 'Business city',
		routing: {
			send: {
				type: 'body',
				property: 'city',
			},
		},
	},
	{
		displayName: 'State',
		name: 'state',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		description: 'Business state/province',
		routing: {
			send: {
				type: 'body',
				property: 'state',
			},
		},
	},
	{
		displayName: 'Country',
		name: 'country',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: 'US',
		description: 'Country code (e.g., US, CA, UK, AF)',
		routing: {
			send: {
				type: 'body',
				property: 'country',
			},
		},
	},
	{
		displayName: 'Postal Code',
		name: 'postalCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		description: 'Postal/ZIP code',
		routing: {
			send: {
				type: 'body',
				property: 'postalCode',
			},
		},
	},
	{
		displayName: 'Timezone',
		name: 'timezone',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		options: [
			{ name: 'US/Eastern', value: 'US/Eastern' },
			{ name: 'US/Central', value: 'US/Central' },
			{ name: 'US/Mountain', value: 'US/Mountain' },
			{ name: 'US/Pacific', value: 'US/Pacific' },
			{ name: 'Europe/London', value: 'Europe/London' },
			{ name: 'Europe/Paris', value: 'Europe/Paris' },
			{ name: 'Asia/Tokyo', value: 'Asia/Tokyo' },
			{ name: 'Australia/Sydney', value: 'Australia/Sydney' },
		],
		default: 'US/Eastern',
		description: 'Business timezone',
		routing: {
			send: {
				type: 'body',
				property: 'timezone',
			},
		},
	},
	// Prospect Info Fields - Required
	{
		displayName: 'Prospect Information',
		name: 'prospectInfoNotice',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		description: 'The following fields are for the primary contact person of this sub-account',
	},
	{
		displayName: 'Prospect First Name',
		name: 'prospectFirstName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		description: 'First name of the primary contact',
		routing: {
			send: {
				type: 'body',
				property: 'prospectInfo.firstName',
			},
		},
	},
	{
		displayName: 'Prospect Last Name',
		name: 'prospectLastName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		description: 'Last name of the primary contact',
		routing: {
			send: {
				type: 'body',
				property: 'prospectInfo.lastName',
			},
		},
	},
	{
		displayName: 'Prospect Email',
		name: 'prospectEmail',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount'],
			},
		},
		default: '',
		description: 'Email address of the primary contact',
		routing: {
			send: {
				type: 'body',
				property: 'prospectInfo.email',
			},
		},
	},

	// Location ID field for various operations
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['getSubAccount', 'updateSubAccount', 'deleteSubAccount', 'getBusinessProfile', 'updateBusinessProfile'],
			},
		},
		default: '',
		description: 'The ID of the sub-account',
	},

	// User ID field for user operations
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['updateUser', 'deleteUser'],
			},
		},
		default: '',
		description: 'The ID of the user',
	},

	// Create User Fields
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createUser'],
			},
		},
		default: '',
		description: 'User first name',
		routing: {
			send: {
				type: 'body',
				property: 'firstName',
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createUser'],
			},
		},
		default: '',
		description: 'User last name',
		routing: {
			send: {
				type: 'body',
				property: 'lastName',
			},
		},
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createUser'],
			},
		},
		default: '',
		description: 'User email address',
		routing: {
			send: {
				type: 'body',
				property: 'email',
			},
		},
	},
	{
		displayName: 'User Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createUser'],
			},
		},
		options: [
			{ name: 'Account', value: 'account' },
			{ name: 'Agency', value: 'agency' },
		],
		default: 'account',
		description: 'Type of user access',
		routing: {
			send: {
				type: 'body',
				property: 'type',
			},
		},
	},
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createUser'],
			},
		},
		options: [
			{ name: 'Admin', value: 'admin' },
			{ name: 'User', value: 'user' },
		],
		default: 'user',
		description: 'User role level',
		routing: {
			send: {
				type: 'body',
				property: 'role',
			},
		},
	},
	{
		displayName: 'Location IDs',
		name: 'locationIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createUser'],
			},
		},
		default: '',
		description: 'Comma-separated list of location IDs the user should have access to',
		routing: {
			send: {
				type: 'body',
				property: 'locationIds',
				value: '={{$parameter.locationIds.split(",").map(id => id.trim())}}',
			},
		},
	},

	// Additional/Optional Fields Collection
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['createSubAccount', 'createUser', 'getAllSubAccounts', 'getUsers'],
			},
		},
		options: [
			{
				displayName: 'Allow Duplicate Contact',
				name: 'allowDuplicateContact',
				type: 'boolean',
				default: false,
				description: 'Whether to allow duplicate contacts in this sub-account',
				routing: {
					send: {
						type: 'body',
						property: 'settings.allowDuplicateContact',
					},
				},
			},
			{
				displayName: 'Allow Duplicate Opportunity',
				name: 'allowDuplicateOpportunity',
				type: 'boolean',
				default: false,
				description: 'Whether to allow duplicate opportunities in this sub-account',
				routing: {
					send: {
						type: 'body',
						property: 'settings.allowDuplicateOpportunity',
					},
				},
			},
			{
				displayName: 'Allow Facebook Name Merge',
				name: 'allowFacebookNameMerge',
				type: 'boolean',
				default: false,
				description: 'Whether to allow merging of Facebook contacts by name',
				routing: {
					send: {
						type: 'body',
						property: 'settings.allowFacebookNameMerge',
					},
				},
			},
			{
				displayName: 'Disable Contact Timezone',
				name: 'disableContactTimezone',
				type: 'boolean',
				default: false,
				description: 'Whether to disable contact timezone feature',
				routing: {
					send: {
						type: 'body',
						property: 'settings.disableContactTimezone',
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
				routing: {
					send: {
						type: 'query',
						property: 'limit',
					},
				},
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'User password (leave blank to auto-generate)',
				routing: {
					send: {
						type: 'body',
						property: 'password',
					},
				},
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search term to filter results',
				routing: {
					send: {
						type: 'query',
						property: 'search',
					},
				},
			},
			{
				displayName: 'Settings',
				name: 'settingsNotice',
				type: 'notice',
				default: '',
				description: 'Configure sub-account settings below',
			},
			{
				displayName: 'Skip',
				name: 'skip',
				type: 'number',
				default: 0,
				description: 'Number of records to skip',
				routing: {
					send: {
						type: 'query',
						property: 'skip',
					},
				},
			},
			{
				displayName: 'Snapshot ID',
				name: 'snapshotId',
				type: 'string',
				default: '',
				description: 'Snapshot/template ID to apply to the sub-account',
				routing: {
					send: {
						type: 'body',
						property: 'snapshot.id',
					},
				},
			},
			{
				displayName: 'Snapshot Type',
				name: 'snapshotType',
				type: 'options',
				default: 'vertical',
				options: [
					{ name: 'Own', value: 'own' },
					{ name: 'Imported', value: 'imported' },
					{ name: 'Vertical', value: 'vertical' },
				],
				description: 'Type of snapshot being applied',
				routing: {
					send: {
						type: 'body',
						property: 'snapshot.type',
					},
				},
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Business website URL',
				routing: {
					send: {
						type: 'body',
						property: 'website',
					},
				},
			},
		],
	},

	// Update Fields Collection
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subAccount'],
				operation: ['updateSubAccount', 'updateUser', 'updateBusinessProfile'],
			},
		},
		options: [
			{
				displayName: 'Business Name',
				name: 'businessName',
				type: 'string',
				default: '',
				description: 'Updated business name',
				routing: {
					send: {
						type: 'body',
						property: 'businessName',
					},
				},
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Updated business address',
				routing: {
					send: {
						type: 'body',
						property: 'address',
					},
				},
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'Updated city',
				routing: {
					send: {
						type: 'body',
						property: 'city',
					},
				},
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'Updated state/province',
				routing: {
					send: {
						type: 'body',
						property: 'state',
					},
				},
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'Updated country code',
				routing: {
					send: {
						type: 'body',
						property: 'country',
					},
				},
			},
			{
				displayName: 'Postal Code',
				name: 'postalCode',
				type: 'string',
				default: '',
				description: 'Updated postal/ZIP code',
				routing: {
					send: {
						type: 'body',
						property: 'postalCode',
					},
				},
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Updated website URL',
				routing: {
					send: {
						type: 'body',
						property: 'website',
					},
				},
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'options',
				options: [
					{ name: 'US/Eastern', value: 'US/Eastern' },
					{ name: 'US/Central', value: 'US/Central' },
					{ name: 'US/Mountain', value: 'US/Mountain' },
					{ name: 'US/Pacific', value: 'US/Pacific' },
					{ name: 'Europe/London', value: 'Europe/London' },
					{ name: 'Europe/Paris', value: 'Europe/Paris' },
					{ name: 'Asia/Tokyo', value: 'Asia/Tokyo' },
					{ name: 'Australia/Sydney', value: 'Australia/Sydney' },
				],
				default: 'US/Eastern',
				description: 'Updated timezone',
				routing: {
					send: {
						type: 'body',
						property: 'timezone',
					},
				},
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'Updated first name',
				routing: {
					send: {
						type: 'body',
						property: 'firstName',
					},
				},
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Updated last name',
				routing: {
					send: {
						type: 'body',
						property: 'lastName',
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Updated email address',
				routing: {
					send: {
						type: 'body',
						property: 'email',
					},
				},
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Updated phone number',
				routing: {
					send: {
						type: 'body',
						property: 'phone',
					},
				},
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'options',
				options: [
					{ name: 'Admin', value: 'admin' },
					{ name: 'User', value: 'user' },
				],
				default: 'admin',
				description: 'Updated user role',
				routing: {
					send: {
						type: 'body',
						property: 'role',
					},
				},
			},
			{
				displayName: 'Location IDs',
				name: 'locationIds',
				type: 'string',
				default: '',
				description: 'Updated comma-separated list of location IDs',
				routing: {
					send: {
						type: 'body',
						property: 'locationIds',
						value: '={{$parameter.updateFields.locationIds.split(",").map(id => id.trim())}}',
					},
				},
			},
			{
				displayName: 'Legal Business Name',
				name: 'legalBusinessName',
				type: 'string',
				default: '',
				description: 'Updated legal business name',
				routing: {
					send: {
						type: 'body',
						property: 'legalBusinessName',
					},
				},
			},
			{
				displayName: 'Business Email',
				name: 'businessEmail',
				type: 'string',
				default: '',
				description: 'Updated business email',
				routing: {
					send: {
						type: 'body',
						property: 'businessEmail',
					},
				},
			},
			{
				displayName: 'Business Phone',
				name: 'businessPhone',
				type: 'string',
				default: '',
				description: 'Updated business phone',
				routing: {
					send: {
						type: 'body',
						property: 'businessPhone',
					},
				},
			},
			{
				displayName: 'Business Type',
				name: 'businessType',
				type: 'options',
				options: [
					{ name: 'Corporation', value: 'corporation' },
					{ name: 'LLC', value: 'llc' },
					{ name: 'Partnership', value: 'partnership' },
					{ name: 'Sole Proprietorship', value: 'sole_proprietorship' },
					{ name: 'Non-Profit', value: 'non_profit' },
					{ name: 'Co-Operative', value: 'cooperative' },
				],
				default: 'corporation',
				description: 'Type of business',
				routing: {
					send: {
						type: 'body',
						property: 'businessType',
					},
				},
			},
			{
				displayName: 'Business Industry',
				name: 'businessIndustry',
				type: 'string',
				default: '',

				routing: {
					send: {
						type: 'body',
						property: 'businessIndustry',
					},
				},
			},
			{
				displayName: 'Business Registration ID',
				name: 'businessRegistrationId',
				type: 'string',
				default: '',
				description: 'Business registration number (EIN, etc.)',
				routing: {
					send: {
						type: 'body',
						property: 'businessRegistrationId',
					},
				},
			},
			{
				displayName: 'Branded Domain',
				name: 'brandedDomain',
				type: 'string',
				default: '',
				description: 'Custom branded domain for the sub-account',
				routing: {
					send: {
						type: 'body',
						property: 'brandedDomain',
					},
				},
			},
		],
	},
];
