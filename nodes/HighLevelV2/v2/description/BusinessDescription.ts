import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const businessOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['business'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/businesses/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'business',
								},
							},
						],
					},
				},
				action: 'Create a business',
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/businesses/{{$parameter.businessId}}/',
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
				action: 'Delete a business',
			},
			{
				name: 'Get',
				value: 'get',
				routing: {
					request: {
						method: 'GET',
						url: '=/businesses/{{$parameter.businessId}}/',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'business',
								},
							},
						],
					},
				},
				action: 'Get a business',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				routing: {
					request: {
						method: 'GET',
						url: '/businesses/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
						paginate: true,
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'businesses',
								},
							},
						],
					},
				},
				action: 'Get many businesses',
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: {
						method: 'PUT',
						url: '=/businesses/{{$parameter.businessId}}/',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'business',
								},
							},
						],
					},
				},
				action: 'Update a business',
			},
		],
		default: 'create',
	},
];

const createProperties: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the business',
		routing: {
			send: {
				type: 'body',
				property: 'name',
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
				resource: ['business'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'The address of the business',
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
				description: 'The city where the business is located',
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
				description: 'The state where the business is located',
				routing: {
					send: {
						type: 'body',
						property: 'state',
					},
				},
			},
			{
				displayName: 'Postal Code',
				name: 'postalCode',
				type: 'string',
				default: '',
				description: 'The postal code of the business',
				routing: {
					send: {
						type: 'body',
						property: 'postalCode',
					},
				},
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'The country where the business is located',
				routing: {
					send: {
						type: 'body',
						property: 'country',
					},
				},
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'The phone number of the business',
				routing: {
					send: {
						type: 'body',
						property: 'phone',
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'The email address of the business',
				routing: {
					send: {
						type: 'body',
						property: 'email',
					},
				},
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'The website URL of the business',
				routing: {
					send: {
						type: 'body',
						property: 'website',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the business',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
		],
	},
];

const getProperties: INodeProperties[] = [
	{
		displayName: 'Business ID',
		name: 'businessId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the business to retrieve',
	},
];

const deleteProperties: INodeProperties[] = [
	{
		displayName: 'Business ID',
		name: 'businessId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'The ID of the business to delete',
	},
];

const getAllProperties: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['business'],
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
				resource: ['business'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search businesses by name',
				routing: {
					send: {
						type: 'query',
						property: 'search',
					},
				},
			},
		],
	},
];

const updateProperties: INodeProperties[] = [
	{
		displayName: 'Business ID',
		name: 'businessId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the business to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the business',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'The address of the business',
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
				description: 'The city where the business is located',
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
				description: 'The state where the business is located',
				routing: {
					send: {
						type: 'body',
						property: 'state',
					},
				},
			},
			{
				displayName: 'Postal Code',
				name: 'postalCode',
				type: 'string',
				default: '',
				description: 'The postal code of the business',
				routing: {
					send: {
						type: 'body',
						property: 'postalCode',
					},
				},
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				description: 'The country where the business is located',
				routing: {
					send: {
						type: 'body',
						property: 'country',
					},
				},
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'The phone number of the business',
				routing: {
					send: {
						type: 'body',
						property: 'phone',
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'The email address of the business',
				routing: {
					send: {
						type: 'body',
						property: 'email',
					},
				},
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'The website URL of the business',
				routing: {
					send: {
						type: 'body',
						property: 'website',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the business',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
		],
	},
];

export const businessFields: INodeProperties[] = [
	...createProperties,
	...getProperties,
	...deleteProperties,
	...getAllProperties,
	...updateProperties,
]; 