import type { INodeProperties } from 'n8n-workflow';

export const surveyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['survey'],
			},
		},
		options: [
			{
				name: 'Get Surveys',
				value: 'getSurveys',
				description: 'Get all surveys',
				action: 'Get surveys',
			},
			{
				name: 'Get Survey Submissions',
				value: 'getSurveySubmissions',

				action: 'Get survey submissions',
			},
		],
		default: 'getSurveys',
	},
];

export const surveyFields: INodeProperties[] = [
	// Get Surveys Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['getSurveys'],
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
					{
						name: 'Closed',
						value: 'closed',
					},
				],
				default: [],
				description: 'Filter surveys by status',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Feedback',
						value: 'feedback',
					},
					{
						name: 'NPS',
						value: 'nps',
					},
					{
						name: 'CSAT',
						value: 'csat',
					},
					{
						name: 'Rating',
						value: 'rating',
					},
					{
						name: 'Poll',
						value: 'poll',
					},
					{
						name: 'Questionnaire',
						value: 'questionnaire',
					},
					{
						name: 'Market Research',
						value: 'market-research',
					},
				],
				default: 'feedback',
				description: 'Filter surveys by type',
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Filter surveys by active status',
			},
			{
				displayName: 'Is Public',
				name: 'isPublic',
				type: 'boolean',
				default: true,
				description: 'Filter surveys by public accessibility',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search surveys by name or title',
			},
			{
				displayName: 'Include Analytics',
				name: 'includeAnalytics',
				type: 'boolean',
				default: false,
				description: 'Whether to include survey analytics',
			},
			{
				displayName: 'Include Questions',
				name: 'includeQuestions',
				type: 'boolean',
				default: false,
				description: 'Whether to include survey questions',
			},
			{
				displayName: 'Include Settings',
				name: 'includeSettings',
				type: 'boolean',
				default: false,
				description: 'Whether to include survey settings',
			},
			{
				displayName: 'Date Range',
				name: 'dateRange',
				type: 'fixedCollection',
				placeholder: 'Add Date Range',
				default: {},
				options: [
					{
						displayName: 'Date Range',
						name: 'dateRange',
						values: [
							{
								displayName: 'Start Date',
								name: 'startDate',
								type: 'dateTime',
								default: '',
								description: 'Filter surveys created after this date',
							},
							{
								displayName: 'End Date',
								name: 'endDate',
								type: 'dateTime',
								default: '',
								description: 'Filter surveys created before this date',
							},
						],
					},
				],
			},
			{
				displayName: 'Schedule Filter',
				name: 'scheduleFilter',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Scheduled',
						value: 'scheduled',
					},
					{
						name: 'Active Now',
						value: 'activeNow',
					},
					{
						name: 'Upcoming',
						value: 'upcoming',
					},
					{
						name: 'Ended',
						value: 'ended',
					},
				],
				default: 'all',
				description: 'Filter surveys by schedule status',
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
						name: 'Last Response',
						value: 'lastResponseAt',
					},
					{
						name: 'Response Count',
						value: 'responseCount',
					},
					{
						name: 'Completion Rate',
						value: 'completionRate',
					},
				],
				default: 'createdAt',
				description: 'Sort surveys by field',
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

	// Get Survey Submissions Fields
	{
		displayName: 'Survey ID',
		name: 'surveyId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['getSurveySubmissions'],
			},
		},
		description: 'ID of the survey to get submissions for (leave empty for all surveys)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['survey'],
				operation: ['getSurveySubmissions'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				options: [
					{
						name: 'Completed',
						value: 'completed',
					},
					{
						name: 'Partial',
						value: 'partial',
					},
					{
						name: 'Abandoned',
						value: 'abandoned',
					},
					{
						name: 'Reviewed',
						value: 'reviewed',
					},
					{
						name: 'Archived',
						value: 'archived',
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
				displayName: 'Completion Percentage',
				name: 'completionPercentage',
				type: 'fixedCollection',
				placeholder: 'Add Completion Filter',
				default: {},
				options: [
					{
						displayName: 'Completion Range',
						name: 'completionRange',
						values: [
							{
								displayName: 'Minimum Completion %',
								name: 'minCompletion',
								type: 'number',
								typeOptions: {
									minValue: 0,
									maxValue: 100,
								},
								default: 0,
								description: 'Minimum completion percentage',
							},
							{
								displayName: 'Maximum Completion %',
								name: 'maxCompletion',
								type: 'number',
								typeOptions: {
									minValue: 0,
									maxValue: 100,
								},
								default: 100,
								description: 'Maximum completion percentage',
							},
						],
					},
				],
			},
			{
				displayName: 'Score Filter',
				name: 'scoreFilter',
				type: 'fixedCollection',
				placeholder: 'Add Score Filter',
				default: {},
				options: [
					{
						displayName: 'Score Range',
						name: 'scoreRange',
						values: [
							{
								displayName: 'Score Type',
								name: 'scoreType',
								type: 'options',
								options: [
									{
										name: 'Total Score',
										value: 'totalScore',
									},
									{
										name: 'NPS Score',
										value: 'npsScore',
									},
									{
										name: 'CSAT Score',
										value: 'csatScore',
									},
									{
										name: 'Percentage',
										value: 'percentage',
									},
								],
								default: 'totalScore',
								description: 'Type of score to filter by',
							},
							{
								displayName: 'Minimum Score',
								name: 'minScore',
								type: 'number',
								default: 0,
								description: 'Minimum score value',
							},
							{
								displayName: 'Maximum Score',
								name: 'maxScore',
								type: 'number',
								default: 10,
								description: 'Maximum score value',
							},
						],
					},
				],
			},
			{
				displayName: 'Date Range',
				name: 'dateRange',
				type: 'fixedCollection',
				placeholder: 'Add Date Range',
				default: {},
				options: [
					{
						displayName: 'Date Range',
						name: 'dateRange',
						values: [
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
						],
					},
				],
			},
			{
				displayName: 'Include Responses',
				name: 'includeResponses',
				type: 'boolean',
				default: true,
				description: 'Whether to include detailed responses',
			},
			{
				displayName: 'Include Scoring',
				name: 'includeScoring',
				type: 'boolean',
				default: false,
				description: 'Whether to include scoring information',
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
				displayName: 'Include Analytics',
				name: 'includeAnalytics',
				type: 'boolean',
				default: false,
				description: 'Whether to include aggregate analytics',
			},
			{
				displayName: 'Anonymous Only',
				name: 'anonymousOnly',
				type: 'boolean',
				default: false,
				description: 'Whether to include only anonymous responses',
			},
			{
				displayName: 'Device Type',
				name: 'deviceType',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Desktop',
						value: 'desktop',
					},
					{
						name: 'Mobile',
						value: 'mobile',
					},
					{
						name: 'Tablet',
						value: 'tablet',
					},
				],
				default: 'all',
				description: 'Filter submissions by device type',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search submissions by response content',
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
						name: 'Started At',
						value: 'startedAt',
					},
					{
						name: 'Completion Time',
						value: 'totalTimeSpent',
					},
					{
						name: 'Completion Percentage',
						value: 'completionPercentage',
					},
					{
						name: 'Total Score',
						value: 'totalScore',
					},
					{
						name: 'NPS Score',
						value: 'npsScore',
					},
					{
						name: 'CSAT Score',
						value: 'csatScore',
					},
					{
						name: 'Survey Name',
						value: 'surveyName',
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
]; 