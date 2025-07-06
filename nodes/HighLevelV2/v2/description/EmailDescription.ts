import type { INodeProperties } from 'n8n-workflow';

export const emailOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['email'],
			},
		},
		options: [
			{
				name: 'Get Campaigns',
				value: 'getCampaigns',
				description: 'Get all email campaigns',
				action: 'Get email campaigns',
			},
			{
				name: 'Create Template',
				value: 'createTemplate',
				description: 'Create a new email template',
				action: 'Create email template',
			},
			{
				name: 'Get Templates',
				value: 'getTemplates',
				description: 'Get all email templates',
				action: 'Get email templates',
			},
			{
				name: 'Update Template',
				value: 'updateTemplate',
				description: 'Update an existing email template',
				action: 'Update email template',
			},
			{
				name: 'Delete Template',
				value: 'deleteTemplate',
				description: 'Delete an email template',
				action: 'Delete email template',
			},
		],
		default: 'getCampaigns',
	},
];

export const emailFields: INodeProperties[] = [
	// Get Campaigns Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['getCampaigns'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				options: [
					{
						name: 'Draft',
						value: 'draft',
					},
					{
						name: 'Scheduled',
						value: 'scheduled',
					},
					{
						name: 'Sending',
						value: 'sending',
					},
					{
						name: 'Sent',
						value: 'sent',
					},
					{
						name: 'Paused',
						value: 'paused',
					},
					{
						name: 'Cancelled',
						value: 'cancelled',
					},
				],
				default: [],
				description: 'Filter campaigns by status',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'One-Time',
						value: 'one-time',
					},
					{
						name: 'Recurring',
						value: 'recurring',
					},
					{
						name: 'Automated',
						value: 'automated',
					},
					{
						name: 'Drip',
						value: 'drip',
					},
				],
				default: 'one-time',
				description: 'Filter campaigns by type',
			},
			{
				displayName: 'Template ID',
				name: 'templateId',
				type: 'string',
				default: '',
				description: 'Filter campaigns by template ID',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Filter campaigns created after this date',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Filter campaigns created before this date',
			},
			{
				displayName: 'Include Analytics',
				name: 'includeAnalytics',
				type: 'boolean',
				default: false,
				description: 'Whether to include campaign analytics',
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

	// Create Template Fields
	{
		displayName: 'Template Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['createTemplate'],
			},
		},
		description: 'Name of the email template',
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['createTemplate'],
			},
		},
		description: 'Email subject line template',
	},
	{
		displayName: 'Template Type',
		name: 'type',
		type: 'options',
		options: [
			{
				name: 'Email',
				value: 'email',
			},
			{
				name: 'SMS',
				value: 'sms',
			},
			{
				name: 'Notification',
				value: 'notification',
			},
		],
		default: 'email',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['createTemplate'],
			},
		},
		description: 'Type of template',
	},
	{
		displayName: 'Category',
		name: 'category',
		type: 'options',
		options: [
			{
				name: 'Marketing',
				value: 'marketing',
			},
			{
				name: 'Transactional',
				value: 'transactional',
			},
			{
				name: 'Automated',
				value: 'automated',
			},
			{
				name: 'Drip',
				value: 'drip',
			},
			{
				name: 'Welcome',
				value: 'welcome',
			},
			{
				name: 'Follow-Up',
				value: 'followup',
			},
		],
		default: 'marketing',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['createTemplate'],
			},
		},
		description: 'Template category',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'collection',
		placeholder: 'Add Content',
		default: {},
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['createTemplate'],
			},
		},
		options: [
			{
				displayName: 'HTML Content',
				name: 'html',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				default: '',
				description: 'HTML content of the template',
			},
			{
				displayName: 'Text Content',
				name: 'text',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'Plain text content of the template',
			},
			{
				displayName: 'Design Data',
				name: 'design',
				type: 'json',
				default: '{}',
				description: 'Design/layout information in JSON format',
			},
		],
	},
	{
		displayName: 'Template Variables',
		name: 'variables',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Variable',
		default: {},
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['createTemplate'],
			},
		},
		options: [
			{
				displayName: 'Variable',
				name: 'variable',
				values: [
					{
						displayName: 'Default Value',
						name: 'defaultValue',
						type: 'string',
						default: '',
						description: 'Default value for the variable',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Variable description',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Variable name (e.g.,	{{firstName}})',
					},
					{
						displayName: 'Required',
						name: 'required',
						type: 'boolean',
						default: false,
						description: 'Whether the variable is required',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Text',
								value: 'text',
							},
							{
								name: 'Number',
								value: 'number',
							},
							{
								name: 'Date',
								value: 'date',
							},
							{
								name: 'Boolean',
								value: 'boolean',
							},
							{
								name: 'URL',
								value: 'url',
							},
							{
								name: 'Email',
								value: 'email',
							},
						],
						default: 'text',
						description: 'Variable type',
					},
			],
			},
		],
	},
	{
		displayName: 'Template Settings',
		name: 'settings',
		type: 'collection',
		placeholder: 'Add Setting',
		default: {},
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['createTemplate'],
			},
		},
		options: [
			{
				displayName: 'Track Opens',
				name: 'trackOpens',
				type: 'boolean',
				default: true,
				description: 'Whether to track email opens',
			},
			{
				displayName: 'Track Clicks',
				name: 'trackClicks',
				type: 'boolean',
				default: true,
				description: 'Whether to track link clicks',
			},
			{
				displayName: 'Enable Unsubscribe',
				name: 'enableUnsubscribe',
				type: 'boolean',
				default: true,
				description: 'Whether to include unsubscribe link',
			},
			{
				displayName: 'Preview Text',
				name: 'previewText',
				type: 'string',
				default: '',
				description: 'Email preview text',
			},
			{
				displayName: 'From Email',
				name: 'fromEmail',
				type: 'string',
				default: '',
				description: 'Default sender email',
			},
			{
				displayName: 'From Name',
				name: 'fromName',
				type: 'string',
				default: '',
				description: 'Default sender name',
			},
			{
				displayName: 'Reply To',
				name: 'replyTo',
				type: 'string',
				default: '',
				description: 'Default reply-to email',
			},
		],
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['createTemplate'],
			},
		},
		description: 'Comma-separated list of tags for template organization',
	},
	{
		displayName: 'Is Active',
		name: 'isActive',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['createTemplate'],
			},
		},
		description: 'Whether the template is active',
	},
	{
		displayName: 'Is Default',
		name: 'isDefault',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['createTemplate'],
			},
		},
		description: 'Whether this is a default template',
	},

	// Get Templates Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['getTemplates'],
			},
		},
		options: [
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Email',
						value: 'email',
					},
					{
						name: 'SMS',
						value: 'sms',
					},
					{
						name: 'Notification',
						value: 'notification',
					},
				],
				default: 'email',
				description: 'Filter templates by type',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'options',
				options: [
					{
						name: 'Marketing',
						value: 'marketing',
					},
					{
						name: 'Transactional',
						value: 'transactional',
					},
					{
						name: 'Automated',
						value: 'automated',
					},
					{
						name: 'Drip',
						value: 'drip',
					},
					{
						name: 'Welcome',
						value: 'welcome',
					},
					{
						name: 'Follow-Up',
						value: 'followup',
					},
				],
				default: 'marketing',
				description: 'Filter templates by category',
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Filter templates by active status',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search templates by name or subject',
			},
			{
				displayName: 'Include Analytics',
				name: 'includeAnalytics',
				type: 'boolean',
				default: false,
				description: 'Whether to include template analytics',
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
						name: 'Created At',
						value: 'createdAt',
					},
					{
						name: 'Updated At',
						value: 'updatedAt',
					},
					{
						name: 'Last Used',
						value: 'lastUsed',
					},
					{
						name: 'Usage Count',
						value: 'usageCount',
					},
				],
				default: 'createdAt',
				description: 'Sort templates by field',
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
				default: 'desc',

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

	// Update Template Fields
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['updateTemplate'],
			},
		},
		description: 'ID of the template to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['updateTemplate'],
			},
		},
		options: [
			{
				displayName: 'Template Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Updated template name',
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'Updated email subject line template',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'options',
				options: [
					{
						name: 'Marketing',
						value: 'marketing',
					},
					{
						name: 'Transactional',
						value: 'transactional',
					},
					{
						name: 'Automated',
						value: 'automated',
					},
					{
						name: 'Drip',
						value: 'drip',
					},
					{
						name: 'Welcome',
						value: 'welcome',
					},
					{
						name: 'Follow-Up',
						value: 'followup',
					},
				],
				default: 'marketing',
				description: 'Updated template category',
			},
			{
				displayName: 'HTML Content',
				name: 'htmlContent',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				default: '',
				description: 'Updated HTML content of the template',
			},
			{
				displayName: 'Text Content',
				name: 'textContent',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				default: '',
				description: 'Updated plain text content of the template',
			},
			{
				displayName: 'Design Data',
				name: 'design',
				type: 'json',
				default: '{}',
				description: 'Updated design/layout information in JSON format',
			},
			{
				displayName: 'Track Opens',
				name: 'trackOpens',
				type: 'boolean',
				default: true,
				description: 'Whether to track email opens',
			},
			{
				displayName: 'Track Clicks',
				name: 'trackClicks',
				type: 'boolean',
				default: true,
				description: 'Whether to track link clicks',
			},
			{
				displayName: 'Enable Unsubscribe',
				name: 'enableUnsubscribe',
				type: 'boolean',
				default: true,
				description: 'Whether to include unsubscribe link',
			},
			{
				displayName: 'Preview Text',
				name: 'previewText',
				type: 'string',
				default: '',
				description: 'Email preview text',
			},
			{
				displayName: 'From Email',
				name: 'fromEmail',
				type: 'string',
				default: '',
				description: 'Default sender email',
			},
			{
				displayName: 'From Name',
				name: 'fromName',
				type: 'string',
				default: '',
				description: 'Default sender name',
			},
			{
				displayName: 'Reply To',
				name: 'replyTo',
				type: 'string',
				default: '',
				description: 'Default reply-to email',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags for template organization',
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the template is active',
			},
			{
				displayName: 'Is Default',
				name: 'isDefault',
				type: 'boolean',
				default: false,
				description: 'Whether this is a default template',
			},
		],
	},
	{
		displayName: 'Template Variables',
		name: 'variables',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Variable',
		default: {},
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['updateTemplate'],
			},
		},
		options: [
			{
				displayName: 'Variable',
				name: 'variable',
				values: [
					{
						displayName: 'Default Value',
						name: 'defaultValue',
						type: 'string',
						default: '',
						description: 'Default value for the variable',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Variable description',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Variable name (e.g.,	{{firstName}})',
					},
					{
						displayName: 'Required',
						name: 'required',
						type: 'boolean',
						default: false,
						description: 'Whether the variable is required',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Text',
								value: 'text',
							},
							{
								name: 'Number',
								value: 'number',
							},
							{
								name: 'Date',
								value: 'date',
							},
							{
								name: 'Boolean',
								value: 'boolean',
							},
							{
								name: 'URL',
								value: 'url',
							},
							{
								name: 'Email',
								value: 'email',
							},
						],
						default: 'text',
						description: 'Variable type',
					},
			],
			},
		],
	},

	// Delete Template Fields
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['deleteTemplate'],
			},
		},
		description: 'ID of the template to delete',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['deleteTemplate'],
			},
		},
		options: [
			{
				displayName: 'Force Delete',
				name: 'forceDelete',
				type: 'boolean',
				default: false,
				description: 'Whether to force delete even if template is in use',
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
					maxValue: 90,
				},
				default: 30,
				description: 'Number of days to retain the backup',
				displayOptions: {
					show: {
						createBackup: [true],
					},
				},
			},
		],
	},
]; 