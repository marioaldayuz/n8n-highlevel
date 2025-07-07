import type { INodeProperties } from 'n8n-workflow';

import {
	splitTagsPreSendAction,
} from '../GenericFunctions';

export const blogOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['blog'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: 'https://services.leadconnectorhq.com/blogs/posts',
						headers: {
							'Version': '2021-07-28',
						},
					},
					send: {
						preSend: [splitTagsPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'blog',
								},
							},
						],
					},
				},
				action: 'Create a blog post',
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: 'https://services.leadconnectorhq.com/blogs/posts/={{$parameter["postId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ { "success": true } }}',
								},
							},
						],
					},
				},
				action: 'Delete a blog post',
			},
			{
				name: 'Get',
				value: 'get',
				routing: {
					request: {
						method: 'GET',
						url: 'https://services.leadconnectorhq.com/blogs/posts/={{$parameter["postId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'blog',
								},
							},
						],
					},
				},
				action: 'Get a blog post',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				routing: {
					request: {
						method: 'GET',
						url: 'https://services.leadconnectorhq.com/blogs/posts',
						headers: {
							'Version': '2021-07-28',
						},
					},
					send: {
						paginate: true,
					},
				},
				action: 'Get many blog posts',
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: {
						method: 'PUT',
						url: 'https://services.leadconnectorhq.com/blogs/posts/={{$parameter["postId"]}}',
						headers: {
							'Version': '2021-07-28',
						},
					},
					send: {
						preSend: [splitTagsPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'blog',
								},
							},
						],
					},
				},
				action: 'Update a blog post',
			},
		],
		default: 'create',
	},
];

const createProperties: INodeProperties[] = [
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['blog'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Title of the blog post',
		routing: {
			send: {
				type: 'body',
				property: 'title',
			},
		},
	},
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['blog'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The HighLevel location ID',
		routing: {
			send: {
				type: 'body',
				property: 'locationId',
			},
		},
	},
	{
		displayName: 'Blog ID',
		name: 'blogId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['blog'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The blog ID where the post will be created',
		routing: {
			send: {
				type: 'body',
				property: 'blogId',
			},
		},
	},
	{
		displayName: 'Raw HTML',
		name: 'rawHTML',
		type: 'string',
		typeOptions: {
			rows: 10,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['blog'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'HTML content of the blog post',
		routing: {
			send: {
				type: 'body',
				property: 'rawHTML',
			},
		},
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['blog'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Draft',
				value: 'DRAFT',
			},
			{
				name: 'Published',
				value: 'PUBLISHED',
			},
			{
				name: 'Scheduled',
				value: 'SCHEDULED',
			},
		],
		default: 'DRAFT',
		description: 'Status of the blog post',
		routing: {
			send: {
				type: 'body',
				property: 'status',
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
				resource: ['blog'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Author',
				name: 'author',
				type: 'string',
				default: '',
				description: 'Author ID for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'author',
					},
				},
			},
			{
				displayName: 'Canonical Link',
				name: 'canonicalLink',
				type: 'string',
				default: '',
				description: 'Canonical URL for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'canonicalLink',
					},
				},
			},
			{
				displayName: 'Categories',
				name: 'categories',
				type: 'string',
				hint: 'Comma separated list of category IDs, array of strings can be set in expression',
				default: '',
				description: 'Category IDs for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'categories',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A short description of the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Image Alt Text',
				name: 'imageAltText',
				type: 'string',
				default: '',
				description: 'Alt text for the blog image',
				routing: {
					send: {
						type: 'body',
						property: 'imageAltText',
					},
				},
			},
			{
				displayName: 'Image URL',
				name: 'imageUrl',
				type: 'string',
				default: '',
				description: 'URL of the blog image',
				routing: {
					send: {
						type: 'body',
						property: 'imageUrl',
					},
				},
			},
			{
				displayName: 'Published At',
				name: 'publishedAt',
				type: 'dateTime',
				default: '',
				description: 'Date and time when the blog post was/will be published',
				routing: {
					send: {
						type: 'body',
						property: 'publishedAt',
					},
				},
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				hint: 'Comma separated list of tags, array of strings can be set in expression',
				default: '',
				description: 'Tags for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'tags',
					},
				},
			},
			{
				displayName: 'URL Slug',
				name: 'urlSlug',
				type: 'string',
				default: '',
				description: 'URL slug for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'urlSlug',
					},
				},
			},
		],
	},
];

const updateProperties: INodeProperties[] = [
	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['blog'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the blog post to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['blog'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Author',
				name: 'author',
				type: 'string',
				default: '',
				description: 'Author ID for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'author',
					},
				},
			},
			{
				displayName: 'Blog ID',
				name: 'blogId',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'blogId',
					},
				},
			},
			{
				displayName: 'Canonical Link',
				name: 'canonicalLink',
				type: 'string',
				default: '',
				description: 'Canonical URL for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'canonicalLink',
					},
				},
			},
			{
				displayName: 'Categories',
				name: 'categories',
				type: 'string',
				hint: 'Comma separated list of category IDs, array of strings can be set in expression',
				default: '',
				description: 'Category IDs for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'categories',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'A short description of the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Image Alt Text',
				name: 'imageAltText',
				type: 'string',
				default: '',
				description: 'Alt text for the blog image',
				routing: {
					send: {
						type: 'body',
						property: 'imageAltText',
					},
				},
			},
			{
				displayName: 'Image URL',
				name: 'imageUrl',
				type: 'string',
				default: '',
				description: 'URL of the blog image',
				routing: {
					send: {
						type: 'body',
						property: 'imageUrl',
					},
				},
			},
			{
				displayName: 'Location ID',
				name: 'locationId',
				type: 'string',
				default: '',
				description: 'The HighLevel location ID',
				routing: {
					send: {
						type: 'body',
						property: 'locationId',
					},
				},
			},
			{
				displayName: 'Published At',
				name: 'publishedAt',
				type: 'dateTime',
				default: '',
				description: 'Date and time when the blog post was/will be published',
				routing: {
					send: {
						type: 'body',
						property: 'publishedAt',
					},
				},
			},
			{
				displayName: 'Raw HTML',
				name: 'rawHTML',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				default: '',
				description: 'HTML content of the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'rawHTML',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Draft',
						value: 'DRAFT',
					},
					{
						name: 'Published',
						value: 'PUBLISHED',
					},
					{
						name: 'Scheduled',
						value: 'SCHEDULED',
					},
				],
				default: 'DRAFT',
				description: 'Status of the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				hint: 'Comma separated list of tags, array of strings can be set in expression',
				default: '',
				description: 'Tags for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'tags',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title of the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},
			{
				displayName: 'URL Slug',
				name: 'urlSlug',
				type: 'string',
				default: '',
				description: 'URL slug for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'urlSlug',
					},
				},
			},
		],
	},
];

const deleteProperties: INodeProperties[] = [
	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['blog'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of the blog post to delete',
	},
];

const getProperties: INodeProperties[] = [
	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['blog'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'ID of the blog post to retrieve',
	},
];

const getAllProperties: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['blog'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['blog'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['blog'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Location ID',
				name: 'locationId',
				type: 'string',
				default: '',
				description: 'Filter blog posts by location ID',
				routing: {
					send: {
						type: 'query',
						property: 'locationId',
					},
				},
			},
			{
				displayName: 'Blog ID',
				name: 'blogId',
				type: 'string',
				default: '',
				description: 'Filter blog posts by blog ID',
				routing: {
					send: {
						type: 'query',
						property: 'blogId',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Draft',
						value: 'DRAFT',
					},
					{
						name: 'Published',
						value: 'PUBLISHED',
					},
					{
						name: 'Scheduled',
						value: 'SCHEDULED',
					},
				],
				default: 'all',
				description: 'Filter blog posts by status',
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

export const blogFields: INodeProperties[] = [
	...createProperties,
	...updateProperties,
	...deleteProperties,
	...getProperties,
	...getAllProperties,
];

