import type { INodeProperties } from 'n8n-workflow';

import {
	addLocationIdPreSendAction,
} from '../GenericFunctions';

export const productOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['product'],
			},
		},
		options: [
			{
				name: 'Bulk Update',
				value: 'bulkUpdate',
				routing: {
					request: {
						method: 'PUT',
						url: '/products/bulk',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'products',
								},
							},
						],
					},
				},
				action: 'Bulk update products',
			},
			{
				name: 'Create',
				value: 'create',
				routing: {
					request: {
						method: 'POST',
						url: '/products/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'product',
								},
							},
						],
					},
				},
				action: 'Create a product',
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/products/{{$parameter.productId}}',
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
				action: 'Delete a product',
			},
			{
				name: 'Get',
				value: 'get',
				routing: {
					request: {
						method: 'GET',
						url: '=/products/{{$parameter.productId}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'product',
								},
							},
						],
					},
				},
				action: 'Get a product',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				routing: {
					request: {
						method: 'GET',
						url: '/products/',
					},
					send: {
						preSend: [addLocationIdPreSendAction],
						paginate: true,
					},
				},
				action: 'Get many products',
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: {
						method: 'PUT',
						url: '=/products/{{$parameter.productId}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'product',
								},
							},
						],
					},
				},
				action: 'Update a product',
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
				resource: ['product'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the product',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Price',
		name: 'price',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'Price of the product',
		routing: {
			send: {
				type: 'body',
				property: 'price',
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
				resource: ['product'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the product',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Product category',
				routing: {
					send: {
						type: 'body',
						property: 'category',
					},
				},
			},
			{
				displayName: 'SKU',
				name: 'sku',
				type: 'string',
				default: '',
				description: 'Product SKU (Stock Keeping Unit)',
				routing: {
					send: {
						type: 'body',
						property: 'sku',
					},
				},
			},
			{
				displayName: 'Barcode',
				name: 'barcode',
				type: 'string',
				default: '',
				description: 'Product barcode',
				routing: {
					send: {
						type: 'body',
						property: 'barcode',
					},
				},
			},
			{
				displayName: 'Weight',
				name: 'weight',
				type: 'number',
				default: 0,
				description: 'Product weight',
				routing: {
					send: {
						type: 'body',
						property: 'weight',
					},
				},
			},
			{
				displayName: 'Dimensions',
				name: 'dimensions',
				type: 'string',
				default: '',
				description: 'Product dimensions (e.g., "10x20x30")',
				routing: {
					send: {
						type: 'body',
						property: 'dimensions',
					},
				},
			},
			{
				displayName: 'Images',
				name: 'images',
				type: 'string',
				default: '',
				description: 'Comma-separated list of image URLs',
				routing: {
					send: {
						type: 'body',
						property: 'images',
					},
				},
			},
			{
				displayName: 'Stock Quantity',
				name: 'stockQuantity',
				type: 'number',
				default: 0,
				description: 'Available stock quantity',
				routing: {
					send: {
						type: 'body',
						property: 'stockQuantity',
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
						name: 'Draft',
						value: 'draft',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
				],
				default: 'active',
				description: 'Product status',
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
				default: '',
				description: 'Comma-separated list of product tags',
				routing: {
					send: {
						type: 'body',
						property: 'tags',
					},
				},
			},
			{
				displayName: 'Tax Rate',
				name: 'taxRate',
				type: 'number',
				default: 0,
				description: 'Tax rate for the product (percentage)',
				routing: {
					send: {
						type: 'body',
						property: 'taxRate',
					},
				},
			},
			{
				displayName: 'Track Inventory',
				name: 'trackInventory',
				type: 'boolean',
				default: false,
				description: 'Whether to track inventory for this product',
				routing: {
					send: {
						type: 'body',
						property: 'trackInventory',
					},
				},
			},
		],
	},
];

const updateProperties: INodeProperties[] = [
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the product to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Barcode',
				name: 'barcode',
				type: 'string',
				default: '',
				description: 'Product barcode',
				routing: {
					send: {
						type: 'body',
						property: 'barcode',
					},
				},
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Product category',
				routing: {
					send: {
						type: 'body',
						property: 'category',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the product',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Dimensions',
				name: 'dimensions',
				type: 'string',
				default: '',
				description: 'Product dimensions (e.g., "10x20x30")',
				routing: {
					send: {
						type: 'body',
						property: 'dimensions',
					},
				},
			},
			{
				displayName: 'Images',
				name: 'images',
				type: 'string',
				default: '',
				description: 'Comma-separated list of image URLs',
				routing: {
					send: {
						type: 'body',
						property: 'images',
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the product',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Price',
				name: 'price',
				type: 'number',
				default: 0,
				description: 'Price of the product',
				routing: {
					send: {
						type: 'body',
						property: 'price',
					},
				},
			},
			{
				displayName: 'SKU',
				name: 'sku',
				type: 'string',
				default: '',
				description: 'Product SKU (Stock Keeping Unit)',
				routing: {
					send: {
						type: 'body',
						property: 'sku',
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
						name: 'Draft',
						value: 'draft',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
				],
				default: 'active',
				description: 'Product status',
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
			{
				displayName: 'Stock Quantity',
				name: 'stockQuantity',
				type: 'number',
				default: 0,
				description: 'Available stock quantity',
				routing: {
					send: {
						type: 'body',
						property: 'stockQuantity',
					},
				},
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of product tags',
				routing: {
					send: {
						type: 'body',
						property: 'tags',
					},
				},
			},
			{
				displayName: 'Tax Rate',
				name: 'taxRate',
				type: 'number',
				default: 0,
				description: 'Tax rate for the product (percentage)',
				routing: {
					send: {
						type: 'body',
						property: 'taxRate',
					},
				},
			},
			{
				displayName: 'Track Inventory',
				name: 'trackInventory',
				type: 'boolean',
				default: false,
				description: 'Whether to track inventory for this product',
				routing: {
					send: {
						type: 'body',
						property: 'trackInventory',
					},
				},
			},
			{
				displayName: 'Weight',
				name: 'weight',
				type: 'number',
				default: 0,
				description: 'Product weight',
				routing: {
					send: {
						type: 'body',
						property: 'weight',
					},
				},
			},
		],
	},
];

const getProperties: INodeProperties[] = [
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'ID of the product to retrieve',
	},
];

const deleteProperties: INodeProperties[] = [
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of the product to delete',
	},
];

const getAllProperties: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['product'],
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
				resource: ['product'],
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
				resource: ['product'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Filter products by category',
				routing: {
					send: {
						type: 'query',
						property: 'category',
					},
				},
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search products by name or description',
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
						value: '',
					},
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Draft',
						value: 'draft',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
				],
				default: '',
				description: 'Filter products by status',
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

const bulkUpdateProperties: INodeProperties[] = [
	{
		displayName: 'Products',
		name: 'products',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['bulkUpdate'],
			},
		},
		default: {},
		description: 'List of products to update',
		options: [
			{
				name: 'productItems',
				displayName: 'Product',
				values: [
					{
						displayName: 'Product ID',
						name: 'id',
						type: 'string',
						required: true,
						default: '',
						description: 'ID of the product to update',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the product',
					},
					{
						displayName: 'Price',
						name: 'price',
						type: 'number',
						default: 0,
						description: 'Price of the product',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Description of the product',
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
								name: 'Draft',
								value: 'draft',
							},
							{
								name: 'Inactive',
								value: 'inactive',
							},
						],
						default: 'active',
						description: 'Product status',
					},
					{
						displayName: 'Stock Quantity',
						name: 'stockQuantity',
						type: 'number',
						default: 0,
						description: 'Available stock quantity',
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'products',
				value: '={{ $parameter.products.productItems }}',
			},
		},
	},
];

export const productFields: INodeProperties[] = [
	...createProperties,
	...updateProperties,
	...getProperties,
	...deleteProperties,
	...getAllProperties,
	...bulkUpdateProperties,
]; 