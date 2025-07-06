import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Get User',
				value: 'getUser',
				description: 'Get a specific user by ID',
				action: 'Get user',
			},
			{
				name: 'Create User',
				value: 'createUser',
				description: 'Create a new user',
				action: 'Create user',
			},
			{
				name: 'Update User',
				value: 'updateUser',
				description: 'Update an existing user',
				action: 'Update user',
			},
			{
				name: 'Delete User',
				value: 'deleteUser',
				description: 'Delete a user',
				action: 'Delete user',
			},
			{
				name: 'Get Users by Location',
				value: 'getUsersByLocation',
				description: 'Get all users for a specific location',
				action: 'Get users by location',
			},
		],
		default: 'getUser',
	},
];

export const userFields: INodeProperties[] = [
	// Get User Fields
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getUser'],
			},
		},
		description: 'ID of the user to retrieve',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getUser'],
			},
		},
		options: [
			{
				displayName: 'Include Profile',
				name: 'includeProfile',
				type: 'boolean',
				default: false,
				description: 'Whether to include detailed profile information',
			},
			{
				displayName: 'Include Preferences',
				name: 'includePreferences',
				type: 'boolean',
				default: false,
				description: 'Whether to include user preferences',
			},
			{
				displayName: 'Include Roles',
				name: 'includeRoles',
				type: 'boolean',
				default: true,
				description: 'Whether to include user roles and permissions',
			},
			{
				displayName: 'Include Last Activity',
				name: 'includeLastActivity',
				type: 'boolean',
				default: false,
				description: 'Whether to include last activity information',
			},
		],
	},

	// Create User Fields
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createUser'],
			},
		},
		description: 'User email address',
	},
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createUser'],
			},
		},
		description: 'User first name',
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createUser'],
			},
		},
		description: 'User last name',
	},
	{
		displayName: 'Roles',
		name: 'roles',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Role',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createUser'],
			},
		},
		options: [
			{
				displayName: 'Role',
				name: 'role',
				values: [
					{
						displayName: 'Role Type',
						name: 'role',
						type: 'options',
						options: [
							{
								name: 'Admin',
								value: 'admin',
							},
							{
								name: 'Manager',
								value: 'manager',
							},
							{
								name: 'Agent',
								value: 'agent',
							},
							{
								name: 'User',
								value: 'user',
							},
							{
								name: 'Readonly',
								value: 'readonly',
							},
							{
								name: 'Owner',
								value: 'owner',
							},
						],
						default: 'user',
						description: 'User role',
					},
					{
						displayName: 'Location ID',
						name: 'locationId',
						type: 'string',
						default: '',
						description: 'Location ID for this role (optional)',
					},
					{
						displayName: 'Scope Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Account',
								value: 'account',
							},
							{
								name: 'Location',
								value: 'location',
							},
							{
								name: 'Company',
								value: 'company',
							},
						],
						default: 'location',
						description: 'Role scope type',
					},
				],
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['createUser'],
			},
		},
		options: [
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'User phone number',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				description: 'Unique username for the user',
			},
			{
				displayName: 'Location IDs',
				name: 'locationIds',
				type: 'string',
				default: '',
				description: 'Comma-separated list of location IDs the user should have access to',
			},
			{
				displayName: 'Job Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'User job title',
			},
			{
				displayName: 'Department',
				name: 'department',
				type: 'string',
				default: '',
				description: 'User department',
			},
			{
				displayName: 'Bio',
				name: 'bio',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'User biography',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				description: 'User timezone (e.g., America/New_York)',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'options',
				options: [
					{
						name: 'English',
						value: 'en',
					},
					{
						name: 'Spanish',
						value: 'es',
					},
					{
						name: 'French',
						value: 'fr',
					},
					{
						name: 'German',
						value: 'de',
					},
					{
						name: 'Italian',
						value: 'it',
					},
					{
						name: 'Portuguese',
						value: 'pt',
					},
				],
				default: 'en',
				description: 'User preferred language',
			},
			{
				displayName: 'Avatar URL',
				name: 'avatar',
				type: 'string',
				default: '',
				description: 'URL to user avatar image',
			},
			{
				displayName: 'Send Invitation',
				name: 'sendInvitation',
				type: 'boolean',
				default: true,
				description: 'Whether to send an invitation email to the user',
			},
			{
				displayName: 'Generate Password',
				name: 'generatePassword',
				type: 'boolean',
				default: false,
				description: 'Whether to generate a temporary password',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
					{
						name: 'Pending',
						value: 'pending',
					},
					{
						name: 'Invited',
						value: 'invited',
					},
				],
				default: 'invited',
				description: 'Initial user status',
			},
		],
	},

	// Update User Fields
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateUser'],
			},
		},
		description: 'ID of the user to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateUser'],
			},
		},
		options: [
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'Updated first name',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Updated last name',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Updated email address',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Updated phone number',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				description: 'Updated username',
			},
			{
				displayName: 'Job Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Updated job title',
			},
			{
				displayName: 'Department',
				name: 'department',
				type: 'string',
				default: '',
				description: 'Updated department',
			},
			{
				displayName: 'Bio',
				name: 'bio',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Updated biography',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				description: 'Updated timezone',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'options',
				options: [
					{
						name: 'English',
						value: 'en',
					},
					{
						name: 'Spanish',
						value: 'es',
					},
					{
						name: 'French',
						value: 'fr',
					},
					{
						name: 'German',
						value: 'de',
					},
					{
						name: 'Italian',
						value: 'it',
					},
					{
						name: 'Portuguese',
						value: 'pt',
					},
				],
				default: 'en',
				description: 'Updated preferred language',
			},
			{
				displayName: 'Avatar URL',
				name: 'avatar',
				type: 'string',
				default: '',
				description: 'Updated avatar image URL',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
					{
						name: 'Pending',
						value: 'pending',
					},
					{
						name: 'Suspended',
						value: 'suspended',
					},
					{
						name: 'Invited',
						value: 'invited',
					},
				],
				default: 'active',
				description: 'Updated user status',
			},
			{
				displayName: 'Location IDs',
				name: 'locationIds',
				type: 'string',
				default: '',
				description: 'Updated comma-separated list of location IDs',
			},
		],
	},
	{
		displayName: 'User Roles',
		name: 'roles',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Role',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateUser'],
			},
		},
		options: [
			{
				displayName: 'Role',
				name: 'role',
				values: [
					{
						displayName: 'Role Type',
						name: 'role',
						type: 'options',
						options: [
							{
								name: 'Admin',
								value: 'admin',
							},
							{
								name: 'Manager',
								value: 'manager',
							},
							{
								name: 'Agent',
								value: 'agent',
							},
							{
								name: 'User',
								value: 'user',
							},
							{
								name: 'Readonly',
								value: 'readonly',
							},
							{
								name: 'Owner',
								value: 'owner',
							},
						],
						default: 'user',
						description: 'User role',
					},
					{
						displayName: 'Location ID',
						name: 'locationId',
						type: 'string',
						default: '',
						description: 'Location ID for this role',
					},
					{
						displayName: 'Scope Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Account',
								value: 'account',
							},
							{
								name: 'Location',
								value: 'location',
							},
							{
								name: 'Company',
								value: 'company',
							},
						],
						default: 'location',
						description: 'Role scope type',
					},
				],
			},
		],
	},
	{
		displayName: 'Preferences',
		name: 'preferences',
		type: 'collection',
		placeholder: 'Add Preference',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateUser'],
			},
		},
		options: [
			{
				displayName: 'Email Notifications',
				name: 'emailNotifications',
				type: 'boolean',
				default: true,
				description: 'Enable email notifications',
			},
			{
				displayName: 'SMS Notifications',
				name: 'smsNotifications',
				type: 'boolean',
				default: false,
				description: 'Enable SMS notifications',
			},
			{
				displayName: 'Desktop Notifications',
				name: 'desktopNotifications',
				type: 'boolean',
				default: true,
				description: 'Enable desktop notifications',
			},
			{
				displayName: 'Mobile Notifications',
				name: 'mobileNotifications',
				type: 'boolean',
				default: true,
				description: 'Enable mobile push notifications',
			},
			{
				displayName: 'Theme',
				name: 'theme',
				type: 'options',
				options: [
					{
						name: 'Light',
						value: 'light',
					},
					{
						name: 'Dark',
						value: 'dark',
					},
					{
						name: 'Auto',
						value: 'auto',
					},
				],
				default: 'auto',
				description: 'UI theme preference',
			},
			{
				displayName: 'Date Format',
				name: 'dateFormat',
				type: 'options',
				options: [
					{
						name: 'MM/DD/YYYY',
						value: 'MM/DD/YYYY',
					},
					{
						name: 'DD/MM/YYYY',
						value: 'DD/MM/YYYY',
					},
					{
						name: 'YYYY-MM-DD',
						value: 'YYYY-MM-DD',
					},
					{
						name: 'DD-MM-YYYY',
						value: 'DD-MM-YYYY',
					},
				],
				default: 'MM/DD/YYYY',
				description: 'Preferred date format',
			},
			{
				displayName: 'Time Format',
				name: 'timeFormat',
				type: 'options',
				options: [
					{
						name: '12 Hour',
						value: '12h',
					},
					{
						name: '24 Hour',
						value: '24h',
					},
				],
				default: '12h',
				description: 'Preferred time format',
			},
		],
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['updateUser'],
			},
		},
		options: [
			{
				displayName: 'Notify User',
				name: 'notifyUser',
				type: 'boolean',
				default: false,
				description: 'Whether to notify the user about the changes',
			},
			{
				displayName: 'Notify Admins',
				name: 'notifyAdmins',
				type: 'boolean',
				default: false,
				description: 'Whether to notify admin users about the changes',
			},
			{
				displayName: 'Track Changes',
				name: 'trackChanges',
				type: 'boolean',
				default: true,
				description: 'Whether to track and return change history',
			},
		],
	},

	// Delete User Fields
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['deleteUser'],
			},
		},
		description: 'ID of the user to delete',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['deleteUser'],
			},
		},
		options: [
			{
				displayName: 'Transfer Data To User ID',
				name: 'transferToUserId',
				type: 'string',
				default: '',
				description: 'User ID to transfer data to (contacts, campaigns, etc.)',
			},
			{
				displayName: 'Delete Reason',
				name: 'deleteReason',
				type: 'string',
				default: '',
				description: 'Reason for deleting the user (for audit trail)',
			},
			{
				displayName: 'Create Backup',
				name: 'createBackup',
				type: 'boolean',
				default: true,
				description: 'Whether to create a backup for potential recovery',
			},
			{
				displayName: 'Backup Retention Days',
				name: 'backupRetentionDays',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 365,
				},
				default: 30,
				description: 'Number of days to retain the backup',
				displayOptions: {
					show: {
						createBackup: [true],
					},
				},
			},
			{
				displayName: 'Force Delete',
				name: 'forceDelete',
				type: 'boolean',
				default: false,
				description: 'Whether to force delete even if user has dependencies',
			},
			{
				displayName: 'Notify Team',
				name: 'notifyTeam',
				type: 'boolean',
				default: false,
				description: 'Whether to notify team members about user deletion',
			},
			{
				displayName: 'Notify Admins',
				name: 'notifyAdmins',
				type: 'boolean',
				default: true,
				description: 'Whether to notify admin users about deletion',
			},
		],
	},

	// Get Users by Location Fields
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getUsersByLocation'],
			},
		},
		description: 'ID of the location to get users for',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getUsersByLocation'],
			},
		},
		options: [
			{
				displayName: 'Role Filter',
				name: 'role',
				type: 'multiOptions',
				options: [
					{
						name: 'Admin',
						value: 'admin',
					},
					{
						name: 'Manager',
						value: 'manager',
					},
					{
						name: 'Agent',
						value: 'agent',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Readonly',
						value: 'readonly',
					},
					{
						name: 'Owner',
						value: 'owner',
					},
				],
				default: [],
				description: 'Filter users by role',
			},
			{
				displayName: 'Status Filter',
				name: 'status',
				type: 'multiOptions',
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
					{
						name: 'Pending',
						value: 'pending',
					},
					{
						name: 'Suspended',
						value: 'suspended',
					},
					{
						name: 'Invited',
						value: 'invited',
					},
				],
				default: [],
				description: 'Filter users by status',
			},
			{
				displayName: 'Include Profile',
				name: 'includeProfile',
				type: 'boolean',
				default: false,
				description: 'Whether to include detailed profile information',
			},
			{
				displayName: 'Include Roles',
				name: 'includeRoles',
				type: 'boolean',
				default: true,
				description: 'Whether to include user roles and permissions',
			},
			{
				displayName: 'Include Summary',
				name: 'includeSummary',
				type: 'boolean',
				default: false,
				description: 'Whether to include location user summary statistics',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search users by name, email, or username',
			},
			{
				displayName: 'Sort By',
				name: 'sortBy',
				type: 'options',
				options: [
					{
						name: 'Name',
						value: 'name',
					},
					{
						name: 'Email',
						value: 'email',
					},
					{
						name: 'Created At',
						value: 'createdAt',
					},
					{
						name: 'Last Login',
						value: 'lastLoginAt',
					},
					{
						name: 'Status',
						value: 'status',
					},
					{
						name: 'Role',
						value: 'role',
					},
				],
				default: 'name',
				description: 'Sort users by field',
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				options: [
					{
						name: 'ASC',
						value: 'asc',
					},
					{
						name: 'DESC',
						value: 'desc',
					},
				],
				default: 'asc',
				description: 'Sort order',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 20,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Number of results to skip',
			},
		],
	},
]; 