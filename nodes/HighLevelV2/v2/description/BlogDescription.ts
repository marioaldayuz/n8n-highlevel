import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
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
						url: '/blogs/',
					},
					send: {
						preSend: [addLocationIdPreSendAction, splitTagsPreSendAction],
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
						url: '=/blogs/{{$parameter.blogId}}',
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
						url: '=/blogs/{{$parameter.blogId}}',
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
						url: '/blogs/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
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
						url: '=/blogs/{{$parameter.blogId}}',
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
		displayName: 'Content',
		name: 'content',
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
				property: 'content',
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
				displayName: 'Excerpt',
				name: 'excerpt',
				type: 'string',
				default: '',
				description: 'Brief excerpt or summary of the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'excerpt',
					},
				},
			},
			{
				displayName: 'Slug',
				name: 'slug',
				type: 'string',
				default: '',
				description: 'URL-friendly slug for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'slug',
					},
				},
			},
			{
				displayName: 'Categories',
				name: 'categories',
				type: 'string',
				hint: 'Comma separated list of categories, array of strings can be set in expression',
				default: '',
				description: 'Categories for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'categories',
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
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Draft',
						value: 'draft',
					},
					{
						name: 'Published',
						value: 'published',
					},
					{
						name: 'Scheduled',
						value: 'scheduled',
					},
					{
						name: 'Archived',
						value: 'archived',
					},
				],
				default: 'draft',
				description: 'Status of the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
			{
				displayName: 'Featured Image URL',
				name: 'featuredImageUrl',
				type: 'string',
				default: '',
				description: 'URL of the featured image',
				routing: {
					send: {
						type: 'body',
						property: 'featuredImage.url',
					},
				},
			},
			{
				displayName: 'Featured Image Alt Text',
				name: 'featuredImageAlt',
				type: 'string',
				default: '',
				description: 'Alt text for the featured image',
				routing: {
					send: {
						type: 'body',
						property: 'featuredImage.alt',
					},
				},
			},
			{
				displayName: 'SEO Title',
				name: 'seoTitle',
				type: 'string',
				default: '',
				description: 'SEO-optimized title for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'seoTitle',
					},
				},
			},
			{
				displayName: 'SEO Description',
				name: 'seoDescription',
				type: 'string',
				default: '',
				description: 'SEO meta description for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'seoDescription',
					},
				},
			},
			{
				displayName: 'SEO Keywords',
				name: 'seoKeywords',
				type: 'string',
				hint: 'Comma separated list of SEO keywords',
				default: '',
				description: 'SEO keywords for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'seoKeywords',
					},
				},
			},
			{
				displayName: 'Enable Comments',
				name: 'isCommentEnabled',
				type: 'boolean',
				default: true,
				description: 'Whether comments are enabled for this blog post',
				routing: {
					send: {
						type: 'body',
						property: 'isCommentEnabled',
					},
				},
			},
			{
				displayName: 'Featured Post',
				name: 'isFeatured',
				type: 'boolean',
				default: false,
				description: 'Whether this blog post is featured',
				routing: {
					send: {
						type: 'body',
						property: 'isFeatured',
					},
				},
			},
			{
				displayName: 'Scheduled For',
				name: 'scheduledFor',
				type: 'dateTime',
				default: '',
				description: 'Date and time to publish the blog post (for scheduled status)',
				routing: {
					send: {
						type: 'body',
						property: 'scheduledFor',
					},
				},
			},
		],
	},
];

const updateProperties: INodeProperties[] = [
	{
		displayName: 'Blog ID',
		name: 'blogId',
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
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				default: '',
				description: 'HTML content of the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'content',
					},
				},
			},
			{
				displayName: 'Excerpt',
				name: 'excerpt',
				type: 'string',
				default: '',
				description: 'Brief excerpt or summary of the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'excerpt',
					},
				},
			},
			{
				displayName: 'Slug',
				name: 'slug',
				type: 'string',
				default: '',
				description: 'URL-friendly slug for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'slug',
					},
				},
			},
			{
				displayName: 'Categories',
				name: 'categories',
				type: 'string',
				hint: 'Comma separated list of categories, array of strings can be set in expression',
				default: '',
				description: 'Categories for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'categories',
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
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Draft',
						value: 'draft',
					},
					{
						name: 'Published',
						value: 'published',
					},
					{
						name: 'Scheduled',
						value: 'scheduled',
					},
					{
						name: 'Archived',
						value: 'archived',
					},
				],
				default: 'draft',
				description: 'Status of the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
			{
				displayName: 'Featured Image URL',
				name: 'featuredImageUrl',
				type: 'string',
				default: '',
				description: 'URL of the featured image',
				routing: {
					send: {
						type: 'body',
						property: 'featuredImage.url',
					},
				},
			},
			{
				displayName: 'Featured Image Alt Text',
				name: 'featuredImageAlt',
				type: 'string',
				default: '',
				description: 'Alt text for the featured image',
				routing: {
					send: {
						type: 'body',
						property: 'featuredImage.alt',
					},
				},
			},
			{
				displayName: 'SEO Title',
				name: 'seoTitle',
				type: 'string',
				default: '',
				description: 'SEO-optimized title for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'seoTitle',
					},
				},
			},
			{
				displayName: 'SEO Description',
				name: 'seoDescription',
				type: 'string',
				default: '',
				description: 'SEO meta description for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'seoDescription',
					},
				},
			},
			{
				displayName: 'SEO Keywords',
				name: 'seoKeywords',
				type: 'string',
				hint: 'Comma separated list of SEO keywords',
				default: '',
				description: 'SEO keywords for the blog post',
				routing: {
					send: {
						type: 'body',
						property: 'seoKeywords',
					},
				},
			},
			{
				displayName: 'Enable Comments',
				name: 'isCommentEnabled',
				type: 'boolean',
				default: true,
				description: 'Whether comments are enabled for this blog post',
				routing: {
					send: {
						type: 'body',
						property: 'isCommentEnabled',
					},
				},
			},
			{
				displayName: 'Featured Post',
				name: 'isFeatured',
				type: 'boolean',
				default: false,
				description: 'Whether this blog post is featured',
				routing: {
					send: {
						type: 'body',
						property: 'isFeatured',
					},
				},
			},
			{
				displayName: 'Scheduled For',
				name: 'scheduledFor',
				type: 'dateTime',
				default: '',
				description: 'Date and time to publish the blog post (for scheduled status)',
				routing: {
					send: {
						type: 'body',
						property: 'scheduledFor',
					},
				},
			},
		],
	},
];

const deleteProperties: INodeProperties[] = [
	{
		displayName: 'Blog ID',
		name: 'blogId',
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
		displayName: 'Blog ID',
		name: 'blogId',
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
						value: 'draft',
					},
					{
						name: 'Published',
						value: 'published',
					},
					{
						name: 'Scheduled',
						value: 'scheduled',
					},
					{
						name: 'Archived',
						value: 'archived',
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
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Filter blog posts by category',
				routing: {
					send: {
						type: 'query',
						property: 'category',
					},
				},
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				description: 'Filter blog posts by tag',
				routing: {
					send: {
						type: 'query',
						property: 'tag',
					},
				},
			},
			{
				displayName: 'Author ID',
				name: 'authorId',
				type: 'string',
				default: '',
				description: 'Filter blog posts by author ID',
				routing: {
					send: {
						type: 'query',
						property: 'authorId',
					},
				},
			},
			{
				displayName: 'Featured Only',
				name: 'featured',
				type: 'boolean',
				default: false,
				description: 'Return only featured blog posts',
				routing: {
					send: {
						type: 'query',
						property: 'featured',
					},
				},
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				options: [
					{
						name: 'Created Date (Newest First)',
						value: 'createdAt:desc',
					},
					{
						name: 'Created Date (Oldest First)',
						value: 'createdAt:asc',
					},
					{
						name: 'Updated Date (Newest First)',
						value: 'updatedAt:desc',
					},
					{
						name: 'Updated Date (Oldest First)',
						value: 'updatedAt:asc',
					},
					{
						name: 'Title (A-Z)',
						value: 'title:asc',
					},
					{
						name: 'Title (Z-A)',
						value: 'title:desc',
					},
				],
				default: 'createdAt:desc',
				description: 'Sort order for the blog posts',
				routing: {
					send: {
						type: 'query',
						property: 'sortOrder',
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