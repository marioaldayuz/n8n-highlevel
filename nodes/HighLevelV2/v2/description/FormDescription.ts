import type { INodeProperties } from 'n8n-workflow';

export const formOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['form'],
			},
		},
		options: [
			{
				name: 'Get Forms',
				value: 'getForms',
				description: 'Get all forms',
				action: 'Get forms',
			},
			{
				name: 'Get Form Submissions',
				value: 'getFormSubmissions',

				action: 'Get form submissions',
			},
			{
				name: 'Upload File',
				value: 'uploadFile',
				description: 'Upload file to custom field',
				action: 'Upload file to custom field',
			},
		],
		default: 'getForms',
	},
];

export const formFields: INodeProperties[] = [
	// Get Forms Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['getForms'],
			},
		},
		options: [
			{
				displayName: 'Status',
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
						name: 'Draft',
						value: 'draft',
					},
					{
						name: 'Archived',
						value: 'archived',
					},
				],
				default: [],
				description: 'Filter forms by status',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
					{
						name: 'Appointment',
						value: 'appointment',
					},
					{
						name: 'Survey',
						value: 'survey',
					},
					{
						name: 'Registration',
						value: 'registration',
					},
					{
						name: 'Feedback',
						value: 'feedback',
					},
				],
				default: 'contact',
				description: 'Filter forms by type',
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Filter forms by active status',
			},
			{
				displayName: 'Is Public',
				name: 'isPublic',
				type: 'boolean',
				default: true,
				description: 'Filter forms by public accessibility',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search forms by name or title',
			},
			{
				displayName: 'Include Analytics',
				name: 'includeAnalytics',
				type: 'boolean',
				default: false,
				description: 'Whether to include form analytics',
			},
			{
				displayName: 'Include Fields',
				name: 'includeFields',
				type: 'boolean',
				default: false,
				description: 'Whether to include form fields',
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
						name: 'Last Submission',
						value: 'lastSubmissionAt',
					},
					{
						name: 'Submissions Count',
						value: 'submissionsCount',
					},
				],
				default: 'createdAt',
				description: 'Sort forms by field',
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

	// Get Form Submissions Fields
	{
		displayName: 'Form ID',
		name: 'formId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['getFormSubmissions'],
			},
		},
		description: 'ID of the form to get submissions for (leave empty for all forms)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['getFormSubmissions'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				options: [
					{
						name: 'New',
						value: 'new',
					},
					{
						name: 'Read',
						value: 'read',
					},
					{
						name: 'Processed',
						value: 'processed',
					},
					{
						name: 'Archived',
						value: 'archived',
					},
					{
						name: 'Spam',
						value: 'spam',
					},
				],
				default: [],
				description: 'Filter submissions by status',
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				description: 'Filter submissions by contact ID',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter submissions submitted after this date',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter submissions submitted before this date',
			},
			{
				displayName: 'Include Files',
				name: 'includeFiles',
				type: 'boolean',
				default: false,
				description: 'Whether to include uploaded files in the response',
			},
			{
				displayName: 'Include Metadata',
				name: 'includeMetadata',
				type: 'boolean',
				default: false,
				description: 'Whether to include submission metadata',
			},
			{
				displayName: 'Include Notes',
				name: 'includeNotes',
				type: 'boolean',
				default: false,
				description: 'Whether to include notes added to submissions',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search submissions by content',
			},
			{
				displayName: 'Sort By',
				name: 'sortBy',
				type: 'options',
				options: [
					{
						name: 'Submitted At',
						value: 'submittedAt',
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
						name: 'Completion Time',
						value: 'completionTime',
					},
					{
						name: 'Form Name',
						value: 'formName',
					},
				],
				default: 'submittedAt',
				description: 'Sort submissions by field',
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

	// Upload File Fields
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['uploadFile'],
			},
		},
		description: 'ID of the contact to upload the file for',
	},
	{
		displayName: 'Custom Field ID',
		name: 'customFieldId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['uploadFile'],
			},
		},
		description: 'ID of the custom field to upload the file to',
	},
	{
		displayName: 'File',
		name: 'file',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['uploadFile'],
			},
		},
		description: 'File to upload (binary data property name)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['form'],
				operation: ['uploadFile'],
			},
		},
		options: [
			{
				displayName: 'File Name',
				name: 'fileName',
				type: 'string',
				default: '',
				description: 'Custom file name (if different from original)',
			},
			{
				displayName: 'Is Public',
				name: 'isPublic',
				type: 'boolean',
				default: false,
				description: 'Whether the file should be publicly accessible',
			},
			{
				displayName: 'Replace Existing',
				name: 'replaceExisting',
				type: 'boolean',
				default: false,
				description: 'Whether to replace existing file in the custom field',
			},
			{
				displayName: 'Generate Thumbnail',
				name: 'generateThumbnail',
				type: 'boolean',
				default: true,
				description: 'Whether to generate thumbnail for image/video files',
			},
			{
				displayName: 'Validate File',
				name: 'validateFile',
				type: 'boolean',
				default: true,
				description: 'Whether to validate file type and size',
			},
			{
				displayName: 'Max File Size (MB)',
				name: 'maxFileSize',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 10,
				description: 'Maximum file size in MB',
			},
			{
				displayName: 'Allowed File Types',
				name: 'allowedFileTypes',
				type: 'string',
				default: 'jpg,jpeg,png,gif,pdf,doc,docx,xls,xlsx,ppt,pptx,txt,csv',
				description: 'Comma-separated list of allowed file extensions',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags for the file',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'File description',
			},
			{
				displayName: 'Expires At',
				name: 'expiresAt',
				type: 'dateTime',
				default: '',
				description: 'When the file URL should expire (for temporary files)',
			},
		],
	},
]; 