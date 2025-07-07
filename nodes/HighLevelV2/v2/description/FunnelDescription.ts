import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const funnelOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['funnel'],
			},
		},
		options: [
			{
				name: 'Get All Funnels',
				value: 'getFunnels',
				routing: {
					request: {
						method: 'GET',
						url: '/funnels/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'funnels',
								},
							},
						],
					},
				},
				action: 'Get all funnels',
			},
			{
				name: 'Get Funnel Pages',
				value: 'getFunnelPages',
				routing: {
					request: {
						method: 'GET',
						url: '=/funnels/{{$parameter.funnelId}}/pages',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'pages',
								},
							},
						],
					},
				},
				action: 'Get pages for a specific funnel',
			},
			{
				name: 'Get Page Count',
				value: 'getPageCount',
				routing: {
					request: {
						method: 'GET',
						url: '=/funnels/{{$parameter.funnelId}}/pages/count',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'count',
								},
							},
						],
					},
				},
				action: 'Get page count for a specific funnel',
			},
		],
		default: 'getFunnels',
	},
];

export const funnelFields: INodeProperties[] = [
	// Get All Funnels Operation Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['funnel'],
				operation: ['getFunnels'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 20,
				description: 'Maximum number of funnels to return',
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
				description: 'Number of funnels to skip',
				routing: {
					send: {
						type: 'query',
						property: 'offset',
					},
				},
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search term to filter funnels',
				routing: {
					send: {
						type: 'query',
						property: 'search',
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
				],
				default: 'all',
				description: 'Filter by funnel status',
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
				description: 'Filter by funnel category',
				routing: {
					send: {
						type: 'query',
						property: 'category',
					},
				},
			},
		],
	},

	// Get Funnel Pages Operation Fields
	{
		displayName: 'Funnel ID',
		name: 'funnelId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['funnel'],
				operation: ['getFunnelPages', 'getPageCount'],
			},
		},
		default: '',
		description: 'ID of the funnel to get pages for',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['funnel'],
				operation: ['getFunnelPages'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 20,
				description: 'Maximum number of pages to return',
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
				description: 'Number of pages to skip',
				routing: {
					send: {
						type: 'query',
						property: 'offset',
					},
				},
			},
			{
				displayName: 'Page Type',
				name: 'pageType',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Landing Page',
						value: 'landing',
					},
					{
						name: 'Thank You Page',
						value: 'thankyou',
					},
					{
						name: 'Sales Page',
						value: 'sales',
					},
					{
						name: 'Checkout Page',
						value: 'checkout',
					},
					{
						name: 'Upsell Page',
						value: 'upsell',
					},
					{
						name: 'Downsell Page',
						value: 'downsell',
					},
				],
				default: 'all',
				description: 'Filter by page type',
				routing: {
					send: {
						type: 'query',
						property: 'pageType',
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
				],
				default: 'all',
				description: 'Filter by page status',
				routing: {
					send: {
						type: 'query',
						property: 'status',
					},
				},
			},
		],
	},

	// Get Page Count Operation Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['funnel'],
				operation: ['getPageCount'],
			},
		},
		options: [
			{
				displayName: 'Page Type',
				name: 'pageType',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Landing Page',
						value: 'landing',
					},
					{
						name: 'Thank You Page',
						value: 'thankyou',
					},
					{
						name: 'Sales Page',
						value: 'sales',
					},
					{
						name: 'Checkout Page',
						value: 'checkout',
					},
					{
						name: 'Upsell Page',
						value: 'upsell',
					},
					{
						name: 'Downsell Page',
						value: 'downsell',
					},
				],
				default: 'all',
				description: 'Filter by page type for count',
				routing: {
					send: {
						type: 'query',
						property: 'pageType',
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
				],
				default: 'all',
				description: 'Filter by page status for count',
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