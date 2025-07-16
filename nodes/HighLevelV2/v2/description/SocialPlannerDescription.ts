import type { INodeProperties } from 'n8n-workflow';

export const socialPlannerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
			},
		},
		options: [
			{
				name: 'Create Post',
				value: 'createPost',
				action: 'Create a social media post',
				routing: {
					request: {
						method: 'POST',
						url: '=/social-media-posting/{{$parameter.locationId}}/posts',
					},
				},
			},
			{
				name: 'Schedule Post',
				value: 'schedulePost',
				action: 'Schedule a social media post',
				routing: {
					request: {
						method: 'POST',
						url: '=/social-media-posting/{{$parameter.locationId}}/posts',
					},
				},
			},
			{
				name: 'Get Posts',
				value: 'getPosts',
				action: 'Get social media posts',
				routing: {
					request: {
						method: 'POST',
						url: '=/social-media-posting/{{$parameter.locationId}}/posts/list',
					},
				},
			},
			{
				name: 'Get Post',
				value: 'getPost',
				action: 'Get a social media post',
				routing: {
					request: {
						method: 'GET',
						url: '=/social-media-posting/{{$parameter.locationId}}/posts/{{$parameter.postId}}',
					},
				},
			},
			{
				name: 'Update Post',
				value: 'updatePost',
				action: 'Update a social media post',
				routing: {
					request: {
						method: 'PUT',
						url: '=/social-media-posting/{{$parameter.locationId}}/posts/{{$parameter.postId}}',
					},
				},
			},
			{
				name: 'Delete Post',
				value: 'deletePost',
				action: 'Delete a social media post',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/social-media-posting/{{$parameter.locationId}}/posts/{{$parameter.postId}}',
					},
				},
			},
			{
				name: 'Get Social Accounts',
				value: 'getSocialAccounts',
				action: 'Get connected social media accounts',
				routing: {
					request: {
						method: 'GET',
						url: '=/social-media-posting/{{$parameter.locationId}}/accounts',
					},
				},
			},
			{
				name: 'Get Analytics',
				value: 'getAnalytics',
				action: 'Get social media analytics',
				routing: {
					request: {
						method: 'GET',
						url: '=/locations/{{$parameter.locationId}}/social-planner/analytics',
					},
				},
			},
		],
		default: 'createPost',
		noDataExpression: true,
	},
];

const createPostProperties: INodeProperties[] = [
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['createPost'],
			},
		},
		default: '',
		description: 'The location ID where the post will be created',
		routing: {
			send: {
				type: 'body',
				property: 'locationId',
			},
		},
	},
	{
		displayName: 'Post Content',
		name: 'content',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['createPost'],
			},
		},
		default: '',
		description: 'The content of the social media post',
		routing: {
			send: {
				type: 'body',
				property: 'content',
			},
		},
	},
	{
		displayName: 'Social Accounts',
		name: 'socialAccounts',
		type: 'multiOptions',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['createPost'],
			},
		},
		options: [
			{
				name: 'Facebook',
				value: 'facebook',
			},
			{
				name: 'Instagram',
				value: 'instagram',
			},
			{
				name: 'LinkedIn',
				value: 'linkedin',
			},
			{
				name: 'TikTok',
				value: 'tiktok',
			},
			{
				name: 'Google My Business',
				value: 'google_my_business',
			},
			{
				name: 'Pinterest',
				value: 'pinterest',
			},
		],
		default: [],
		description: 'Select the social media platforms to post to',
		routing: {
			send: {
				type: 'body',
				property: 'socialAccounts',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['createPost'],
			},
		},
		options: [
			{
				displayName: 'Media URLs',
				name: 'mediaUrls',
				type: 'string',
				default: '',
				description: 'Comma-separated list of media URLs (images/videos)',
				routing: {
					send: {
						type: 'body',
						property: 'mediaUrls',
					},
				},
			},
			{
				displayName: 'Hashtags',
				name: 'hashtags',
				type: 'string',
				default: '',
				description: 'Hashtags for the post (comma-separated)',
				routing: {
					send: {
						type: 'body',
						property: 'hashtags',
					},
				},
			},
			{
				displayName: 'Post Type',
				name: 'postType',
				type: 'options',
				default: 'post',
				options: [
					{
						name: 'Post',
						value: 'post',
					},
					{
						name: 'Story',
						value: 'story',
					},
					{
						name: 'Reel',
						value: 'reel',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'postType',
					},
				},
			},
			{
				displayName: 'Location Tag',
				name: 'locationTag',
				type: 'string',
				default: '',
				description: 'Location tag for the post',
				routing: {
					send: {
						type: 'body',
						property: 'locationTag',
					},
				},
			},
			{
				displayName: 'Post Immediately',
				name: 'postImmediately',
				type: 'boolean',
				default: true,
				description: 'Whether to post immediately or save as draft',
				routing: {
					send: {
						type: 'body',
						property: 'postImmediately',
					},
				},
			},
		],
	},
];

const schedulePostProperties: INodeProperties[] = [
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['schedulePost'],
			},
		},
		default: '',
		description: 'The location ID where the post will be scheduled',
		routing: {
			send: {
				type: 'body',
				property: 'locationId',
			},
		},
	},
	{
		displayName: 'Post Content',
		name: 'content',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['schedulePost'],
			},
		},
		default: '',
		description: 'The content of the social media post',
		routing: {
			send: {
				type: 'body',
				property: 'content',
			},
		},
	},
	{
		displayName: 'Scheduled Date',
		name: 'scheduleDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['schedulePost'],
			},
		},
		default: '',
		description: 'The date and time when the post should be published',
		routing: {
			send: {
				type: 'body',
				property: 'scheduleDate',
			},
		},
	},
	{
		displayName: 'Social Accounts',
		name: 'socialAccounts',
		type: 'multiOptions',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['schedulePost'],
			},
		},
		options: [
			{
				name: 'Facebook',
				value: 'facebook',
			},
			{
				name: 'Instagram',
				value: 'instagram',
			},
			{
				name: 'LinkedIn',
				value: 'linkedin',
			},
			{
				name: 'TikTok',
				value: 'tiktok',
			},
			{
				name: 'Google My Business',
				value: 'google_my_business',
			},
			{
				name: 'Pinterest',
				value: 'pinterest',
			},
		],
		default: [],
		description: 'Select the social media platforms to post to',
		routing: {
			send: {
				type: 'body',
				property: 'socialAccounts',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['schedulePost'],
			},
		},
		options: [
			{
				displayName: 'Media URLs',
				name: 'mediaUrls',
				type: 'string',
				default: '',
				description: 'Comma-separated list of media URLs (images/videos)',
				routing: {
					send: {
						type: 'body',
						property: 'mediaUrls',
					},
				},
			},
			{
				displayName: 'Hashtags',
				name: 'hashtags',
				type: 'string',
				default: '',
				description: 'Hashtags for the post (comma-separated)',
				routing: {
					send: {
						type: 'body',
						property: 'hashtags',
					},
				},
			},
			{
				displayName: 'Post Type',
				name: 'postType',
				type: 'options',
				default: 'post',
				options: [
					{
						name: 'Post',
						value: 'post',
					},
					{
						name: 'Story',
						value: 'story',
					},
					{
						name: 'Reel',
						value: 'reel',
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'postType',
					},
				},
			},
			{
				displayName: 'Location Tag',
				name: 'locationTag',
				type: 'string',
				default: '',
				description: 'Location tag for the post',
				routing: {
					send: {
						type: 'body',
						property: 'locationTag',
					},
				},
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				description: 'Timezone for scheduling (e.g., America/New_York)',
				routing: {
					send: {
						type: 'body',
						property: 'timezone',
					},
				},
			},
		],
	},
];

const getPostsProperties: INodeProperties[] = [
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['getPosts'],
			},
		},
		default: '',
		description: 'The location ID to get posts from',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['getPosts'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: 'all',
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
						name: 'Published',
						value: 'published',
					},
					{
						name: 'Failed',
						value: 'failed',
					},
					{
						name: 'Draft',
						value: 'draft',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'status',
					},
				},
			},
			{
				displayName: 'Social Account',
				name: 'socialAccount',
				type: 'options',
				default: 'all',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Facebook',
						value: 'facebook',
					},
					{
						name: 'Instagram',
						value: 'instagram',
					},
					{
						name: 'LinkedIn',
						value: 'linkedin',
					},
					{
						name: 'TikTok',
						value: 'tiktok',
					},
					{
						name: 'Google My Business',
						value: 'google_my_business',
					},
					{
						name: 'Pinterest',
						value: 'pinterest',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'socialAccount',
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
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of posts to skip',
				routing: {
					send: {
						type: 'query',
						property: 'offset',
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter posts from this date',
				routing: {
					send: {
						type: 'query',
						property: 'startDate',
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter posts until this date',
				routing: {
					send: {
						type: 'query',
						property: 'endDate',
					},
				},
			},
		],
	},
];

const getPostProperties: INodeProperties[] = [
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['getPost'],
			},
		},
		default: '',
		description: 'The location ID where the post is located',
	},
	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['getPost'],
			},
		},
		default: '',
		description: 'The ID of the post to retrieve',
	},
];

const updatePostProperties: INodeProperties[] = [
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['updatePost'],
			},
		},
		default: '',
		description: 'The location ID where the post is located',
	},
	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['updatePost'],
			},
		},
		default: '',
		description: 'The ID of the post to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['updatePost'],
			},
		},
		options: [
			{
				displayName: 'Post Content',
				name: 'content',
				type: 'string',
				default: '',
				description: 'The updated content of the social media post',
				routing: {
					send: {
						type: 'body',
						property: 'content',
					},
				},
			},
			{
				displayName: 'Scheduled Date',
				name: 'scheduledDate',
				type: 'dateTime',
				default: '',
				description: 'The updated date and time when the post should be published',
				routing: {
					send: {
						type: 'body',
						property: 'scheduledDate',
					},
				},
			},
			{
				displayName: 'Media URLs',
				name: 'mediaUrls',
				type: 'string',
				default: '',
				description: 'Updated comma-separated list of media URLs (images/videos)',
				routing: {
					send: {
						type: 'body',
						property: 'mediaUrls',
					},
				},
			},
			{
				displayName: 'Hashtags',
				name: 'hashtags',
				type: 'string',
				default: '',
				description: 'Updated hashtags for the post (comma-separated)',
				routing: {
					send: {
						type: 'body',
						property: 'hashtags',
					},
				},
			},
			{
				displayName: 'Location Tag',
				name: 'locationTag',
				type: 'string',
				default: '',
				description: 'Updated location tag for the post',
				routing: {
					send: {
						type: 'body',
						property: 'locationTag',
					},
				},
			},
			{
				displayName: 'Social Accounts',
				name: 'socialAccounts',
				type: 'multiOptions',
				options: [
					{
						name: 'Facebook',
						value: 'facebook',
					},
					{
						name: 'Instagram',
						value: 'instagram',
					},
					{
						name: 'LinkedIn',
						value: 'linkedin',
					},
					{
						name: 'TikTok',
						value: 'tiktok',
					},
					{
						name: 'Google My Business',
						value: 'google_my_business',
					},
					{
						name: 'Pinterest',
						value: 'pinterest',
					},
				],
				default: [],
				description: 'Updated social media platforms to post to',
				routing: {
					send: {
						type: 'body',
						property: 'socialAccounts',
					},
				},
			},
		],
	},
];

const deletePostProperties: INodeProperties[] = [
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['deletePost'],
			},
		},
		default: '',
		description: 'The location ID where the post is located',
	},
	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['deletePost'],
			},
		},
		default: '',
		description: 'The ID of the post to delete',
	},
];

const getSocialAccountsProperties: INodeProperties[] = [
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['getSocialAccounts'],
			},
		},
		default: '',
		description: 'The location ID to get social accounts from',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['getSocialAccounts'],
			},
		},
		options: [
			{
				displayName: 'Platform',
				name: 'platform',
				type: 'options',
				default: 'all',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Facebook',
						value: 'facebook',
					},
					{
						name: 'Instagram',
						value: 'instagram',
					},
					{
						name: 'LinkedIn',
						value: 'linkedin',
					},
					{
						name: 'TikTok',
						value: 'tiktok',
					},
					{
						name: 'Google My Business',
						value: 'google_my_business',
					},
					{
						name: 'Pinterest',
						value: 'pinterest',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'platform',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: 'all',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Connected',
						value: 'connected',
					},
					{
						name: 'Disconnected',
						value: 'disconnected',
					},
					{
						name: 'Expired',
						value: 'expired',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'status',
					},
				},
			},
		],
	},
];

const getAnalyticsProperties: INodeProperties[] = [
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['getAnalytics'],
			},
		},
		default: '',
		description: 'The location ID to get analytics from',
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['getAnalytics'],
			},
		},
		default: '',
		description: 'The start date for analytics data',
		routing: {
			send: {
				type: 'query',
				property: 'startDate',
			},
		},
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['getAnalytics'],
			},
		},
		default: '',
		description: 'The end date for analytics data',
		routing: {
			send: {
				type: 'query',
				property: 'endDate',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['socialPlanner'],
				operation: ['getAnalytics'],
			},
		},
		options: [
			{
				displayName: 'Social Account',
				name: 'socialAccount',
				type: 'options',
				default: 'all',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Facebook',
						value: 'facebook',
					},
					{
						name: 'Instagram',
						value: 'instagram',
					},
					{
						name: 'LinkedIn',
						value: 'linkedin',
					},
					{
						name: 'TikTok',
						value: 'tiktok',
					},
					{
						name: 'Google My Business',
						value: 'google_my_business',
					},
					{
						name: 'Pinterest',
						value: 'pinterest',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'socialAccount',
					},
				},
			},
			{
				displayName: 'Metrics',
				name: 'metrics',
				type: 'multiOptions',
				default: ['impressions', 'likes', 'shares', 'comments'],
				options: [
					{
						name: 'Impressions',
						value: 'impressions',
					},
					{
						name: 'Likes',
						value: 'likes',
					},
					{
						name: 'Shares',
						value: 'shares',
					},
					{
						name: 'Comments',
						value: 'comments',
					},
					{
						name: 'Clicks',
						value: 'clicks',
					},
					{
						name: 'Reach',
						value: 'reach',
					},
					{
						name: 'Engagement',
						value: 'engagement',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'metrics',
					},
				},
			},
		],
	},
];

export const socialPlannerFields: INodeProperties[] = [
	...createPostProperties,
	...schedulePostProperties,
	...getPostsProperties,
	...getPostProperties,
	...updatePostProperties,
	...deletePostProperties,
	...getSocialAccountsProperties,
	...getAnalyticsProperties,
];
