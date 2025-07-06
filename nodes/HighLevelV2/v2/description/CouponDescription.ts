import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const couponOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/coupons/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'coupon',
								},
							},
						],
					},
				},
				action: 'Create a coupon',
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/coupons/{{$parameter.couponId}}',
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
				action: 'Delete a coupon',
			},
			{
				name: 'Get',
				value: 'get',
				routing: {
					request: {
						method: 'GET',
						url: '=/coupons/{{$parameter.couponId}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'coupon',
								},
							},
						],
					},
				},
				action: 'Get a coupon',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				routing: {
					request: {
						method: 'GET',
						url: '/coupons/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
						paginate: true,
					},
				},
				action: 'Get many coupons',
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: {
						method: 'PUT',
						url: '=/coupons/{{$parameter.couponId}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'coupon',
								},
							},
						],
					},
				},
				action: 'Update a coupon',
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
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the coupon',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Code',
		name: 'code',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Unique coupon code',
		routing: {
			send: {
				type: 'body',
				property: 'code',
			},
		},
	},
	{
		displayName: 'Discount Type',
		name: 'discountType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Fixed Amount',
				value: 'fixed',
			},
			{
				name: 'Percentage',
				value: 'percentage',
			},
		],
		default: 'fixed',
		description: 'Type of discount for the coupon',
		routing: {
			send: {
				type: 'body',
				property: 'discountType',
			},
		},
	},
	{
		displayName: 'Discount Value',
		name: 'discountValue',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'The discount value (amount or percentage)',
		routing: {
			send: {
				type: 'body',
				property: 'discountValue',
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
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the coupon',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'End date for the coupon validity',
				routing: {
					send: {
						type: 'body',
						property: 'endDate',
					},
				},
			},
			{
				displayName: 'Maximum Discount Amount',
				name: 'maximumDiscountAmount',
				type: 'number',
				default: 0,
				description: 'Maximum discount amount (useful for percentage discounts)',
				routing: {
					send: {
						type: 'body',
						property: 'maximumDiscountAmount',
					},
				},
			},
			{
				displayName: 'Minimum Amount',
				name: 'minimumAmount',
				type: 'number',
				default: 0,
				description: 'Minimum order amount required to use the coupon',
				routing: {
					send: {
						type: 'body',
						property: 'minimumAmount',
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Start date for the coupon validity',
				routing: {
					send: {
						type: 'body',
						property: 'startDate',
					},
				},
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
				],
				default: 'active',
				description: 'Status of the coupon',
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
			{
				displayName: 'Usage Limit',
				name: 'usageLimit',
				type: 'number',
				default: 0,
				description: 'Maximum number of times the coupon can be used (0 for unlimited)',
				routing: {
					send: {
						type: 'body',
						property: 'usageLimit',
					},
				},
			},
			{
				displayName: 'Usage Limit Per Customer',
				name: 'usageLimitPerCustomer',
				type: 'number',
				default: 0,
				description: 'Maximum number of times a single customer can use the coupon (0 for unlimited)',
				routing: {
					send: {
						type: 'body',
						property: 'usageLimitPerCustomer',
					},
				},
			},
		],
	},
];

const updateProperties: INodeProperties[] = [
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the coupon to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the coupon',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Code',
				name: 'code',
				type: 'string',
				default: '',
				description: 'Unique coupon code',
				routing: {
					send: {
						type: 'body',
						property: 'code',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the coupon',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Discount Type',
				name: 'discountType',
				type: 'options',
				options: [
					{
						name: 'Fixed Amount',
						value: 'fixed',
					},
					{
						name: 'Percentage',
						value: 'percentage',
					},
				],
				default: 'fixed',
				description: 'Type of discount for the coupon',
				routing: {
					send: {
						type: 'body',
						property: 'discountType',
					},
				},
			},
			{
				displayName: 'Discount Value',
				name: 'discountValue',
				type: 'number',
				default: 0,
				description: 'The discount value (amount or percentage)',
				routing: {
					send: {
						type: 'body',
						property: 'discountValue',
					},
				},
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Start date for the coupon validity',
				routing: {
					send: {
						type: 'body',
						property: 'startDate',
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'End date for the coupon validity',
				routing: {
					send: {
						type: 'body',
						property: 'endDate',
					},
				},
			},
			{
				displayName: 'Usage Limit',
				name: 'usageLimit',
				type: 'number',
				default: 0,
				description: 'Maximum number of times the coupon can be used (0 for unlimited)',
				routing: {
					send: {
						type: 'body',
						property: 'usageLimit',
					},
				},
			},
			{
				displayName: 'Usage Limit Per Customer',
				name: 'usageLimitPerCustomer',
				type: 'number',
				default: 0,
				description: 'Maximum number of times a single customer can use the coupon (0 for unlimited)',
				routing: {
					send: {
						type: 'body',
						property: 'usageLimitPerCustomer',
					},
				},
			},
			{
				displayName: 'Minimum Amount',
				name: 'minimumAmount',
				type: 'number',
				default: 0,
				description: 'Minimum order amount required to use the coupon',
				routing: {
					send: {
						type: 'body',
						property: 'minimumAmount',
					},
				},
			},
			{
				displayName: 'Maximum Discount Amount',
				name: 'maximumDiscountAmount',
				type: 'number',
				default: 0,
				description: 'Maximum discount amount (useful for percentage discounts)',
				routing: {
					send: {
						type: 'body',
						property: 'maximumDiscountAmount',
					},
				},
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
				],
				default: 'active',
				description: 'Status of the coupon',
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
		],
	},
];

const getProperties: INodeProperties[] = [
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'ID of the coupon to retrieve',
	},
];

const deleteProperties: INodeProperties[] = [
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of the coupon to delete',
	},
];

const getAllProperties: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['coupon'],
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
				resource: ['coupon'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
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
				resource: ['coupon'],
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
						value: '',
					},
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
				],
				default: '',
				description: 'Filter coupons by status',
				routing: {
					send: {
						type: 'query',
						property: 'status',
					},
				},
			},
			{
				displayName: 'Code',
				name: 'code',
				type: 'string',
				default: '',
				description: 'Filter coupons by code',
				routing: {
					send: {
						type: 'query',
						property: 'code',
					},
				},
			},
		],
	},
];

export const couponFields: INodeProperties[] = [
	...createProperties,
	...updateProperties,
	...getProperties,
	...deleteProperties,
	...getAllProperties,
]; 